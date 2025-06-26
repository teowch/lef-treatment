const { Pool } = require('pg');

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'swimming',
  password: 'root',
  port: 5432,
});

async function insertIntoDatabase(data) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Inserção da competição
    const competitionResult = await client.query(
      `INSERT INTO competitions (name, city, nation, start_date, end_date, course)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING competition_id`,
      [
        data.competition.name,
        data.competition.city,
        data.competition.nation,
        data.competition.startDate,
        data.competition.endDate,
        data.competition.course,
      ]
    );
    const competitionId = competitionResult.rows[0].competition_id;

    // Mapeamentos para FK futuras
    const clubIdMap = new Map();
    const heatIdMap = new Map();
    const eventIdMap = new Map();
    const athleteIdMap = new Map();
    const sessionIdMap = new Map();

    // Inserção das sessions
    for (const session of data.sessions) {
      const sessionResult = await client.query(
        `INSERT INTO sessions (competition_id, session_order, session_date)
         VALUES ($1, $2, $3) RETURNING session_id`,
        [competitionId, session.order, session.date]
      );
      sessionIdMap.set(session.order, sessionResult.rows[0].session_id);
    }

    // Inserção dos clubes
    for (const club of data.clubs) {
      const clubResult = await client.query(
        `INSERT INTO clubs (swrid, name, shortname, code, nation, region)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING club_id`,
        [club.swrid, club.name, club.shortname, club.code, club.nation, club.region]
      );
      clubIdMap.set(club.clubid, clubResult.rows[0].club_id);
    }

    // Inserção dos atletas
    for (const athlete of data.athletes) {
      const clubId = clubIdMap.get(athlete.clubId) || null;
      const athleteResult = await client.query(
        `INSERT INTO athletes (swrid, externalid, first_name, last_name, gender, birth_date, clubid, nation, license)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING athleteid`,
        [
          athlete.swrid,
          athlete.externalid,
          athlete.firstName,
          athlete.lastName,
          athlete.gender,
          athlete.birthDate,
          clubId,
          athlete.nation,
          athlete.license,
        ]
      );
      athleteIdMap.set(athlete.athleteid, athleteResult.rows[0].athleteid);
    }

    // Lookup de event_type (stroke + distance → id)
    const eventTypeCache = new Map();
    async function getEventTypeId(stroke, distance) {
      const key = `${stroke}-${distance}`;
      if (eventTypeCache.has(key)) return eventTypeCache.get(key);

      const result = await client.query(
        `SELECT event_type_id FROM event_type WHERE stroke = $1 AND distance = $2`,
        [stroke, distance]
      );

      let eventTypeId;
      if (result.rows.length === 0) {
        // Insert if not found
        const insertResult = await client.query(
          `INSERT INTO event_type (stroke, distance) VALUES ($1, $2) RETURNING event_type_id`,
          [stroke, distance]
        );
        eventTypeId = insertResult.rows[0].event_type_id;
      } else {
        eventTypeId = result.rows[0].event_type_id;
      }
      eventTypeCache.set(key, eventTypeId);
      return eventTypeId;
    }

    // Inserção dos eventos
    for (const event of data.events) {
      const eventTypeId = await getEventTypeId(event.stroke, event.distance);
      const sessionId = sessionIdMap.get(event.session);

      if (!sessionId) {
        throw new Error(`Session ID não encontrado para session number: ${event.session}`);
      }

      // Insere o evento na tabela de eventos
      const eventResult = await client.query(
        `INSERT INTO events (session_id, gender, event_type_id)
         VALUES ($1, $2, $3) RETURNING event_id`,
        [sessionId, event.gender, eventTypeId]
      );
      let eventDbId = eventResult.rows[0].event_id;
      eventIdMap.set(event.eventId, eventDbId);

      for (const agegroup of event.ageGroups) {
        const checkResult = await client.query(`
          SELECT agegroup_id FROM agegroups
          WHERE agemin = $1 AND agemax = $2
          LIMIT 1;
        `, [agegroup.agemin, agegroup.agemax]);

        let agegroupDbId;
        if (checkResult.rows.length > 0) {
          // Já existe
          agegroupId = checkResult.rows[0].agegroup_id;
        } else {
          // Não existe, então cria
          const insertResult = await client.query(`
            INSERT INTO agegroups (agemin, agemax)
            VALUES ($1, $2)
            RETURNING agegroup_id;
          `, [agegroup.agemin, agegroup.agemax]);
          agegroupDbId = insertResult.rows[0].agegroup_id;
        }

        // 2. Insere na tabela de associação (ignora se já existir)
        const insertAssociationQuery = `
          INSERT INTO events_agegroups (event_id, agegroup_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING;
        `;
        await client.query(insertAssociationQuery, [eventDbId, agegroupDbId]);
      }
    }

    // Inserção dos heats
    for (const heat of data.heats) {
        const eventId = eventIdMap.get(heat.eventId);
        const heatResult = await client.query(
            `INSERT INTO heats (event_id, heat_number, heat_order, heat_daytime, heat_status)
            VALUES ($1, $2, $3, $4, $5) RETURNING heatid`,
            [
            eventId,
            heat.heatNumber,
            heat.heatOrder,
            heat.heatDayTime,
            heat.heatStatus,
            ]
        );
        heatIdMap.set(heat.heatId, heatResult.rows[0].heatid);
    }

    // Inserção dos resultados
    const resultIdMap = new Map();
    for (const result of data.results) {
        const heatId = heatIdMap.get(result.heatId);
        const athleteId = athleteIdMap.get(result.athleteid);

        const resultRes = await client.query(
            `INSERT INTO results (heatid, lane, entry_time, swimtime, points, swrid, athleteid, externalid)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING resultid`,
            [
            heatId,
            result.lane,
            result.entryTime,
            result.swimtime,
            result.points,
            result.swrid,
            athleteId,
            result.externalid,
            ]
        );
        const dbResultId = resultRes.rows[0].resultid;
        resultIdMap.set(result.resultId, dbResultId);

        // Se for um resultado de revezamento (ou seja, se tiver relayPositions)
        if (result.relayPositions && result.relayPositions.length > 0) {
            for (const pos of result.relayPositions) {
                const athleteDbId = athleteIdMap.get(pos.athleteid);
                await client.query(
                    `INSERT INTO relay_positions (result_id, position, athlete_id)
                    VALUES ($1, $2, $3)`,
                    [dbResultId, pos.position, athleteDbId]
                );
            }
        }
    }

    // Inserção dos splits
    for (const split of data.splits) {
      const resultId = resultIdMap.get(split.resultId);
      await client.query(
        `INSERT INTO splits (result_id, distance, swimtime)
         VALUES ($1, $2, $3)`,
        [resultId, split.distance, split.swimtime]
      );
    }

    await client.query('COMMIT');
    console.log('Importação concluída com sucesso!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erro durante importação:', err);
    throw err;
  } finally {
    client.release();
  }
  return {
    clubs: data.clubs.length,
    athletes: data.athletes.length,
    events: data.events.length,
    heats: data.heats.length,
    results: data.results.length,
    splits: data.splits.length
  };
}

module.exports = { insertIntoDatabase };


