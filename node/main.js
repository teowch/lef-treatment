const fs = require('fs');
const xml2js = require('xml2js');

const toArray = val => Array.isArray(val) ? val : [val];

const parser = new xml2js.Parser({ explicitArray: false });

function parseLenexFile(filePath) {
  const xmlData = fs.readFileSync(filePath, 'utf-8');

  return parser.parseStringPromise(xmlData).then((result) => {
    const meet = result.LENEX.MEETS.MEET;

    const competition = {
      name: meet.$.name,
      city: meet.$.city,
      nation: meet.$.nation,
      startDate: meet.SESSIONS?.SESSION?.[0]?.$.date,
      endDate: meet.SESSIONS?.SESSION?.[meet.SESSIONS.SESSION.length - 1]?.$.date,
      course: meet.$.course,
    };

    const clubs = (meet.CLUBS.CLUB || []).map(club => ({
      clubid: club.$.clubid,
      swrid: club.$.swrid,
      name: club.$.name,
      code: club.$.code,
      nation: club.$.nation,
    }));

    const athletes = [];
    (meet.CLUBS.CLUB || []).forEach(club => {
      if (!club.ATHLETES.ATHLETE) return;

      const swimmers = Array.isArray(club.ATHLETES.ATHLETE) ? club.ATHLETES.ATHLETE : [club.ATHLETES.ATHLETE];

      swimmers.forEach(swimmer => {
        athletes.push({
          swrid: swimmer.$.swrid,
          athleteid: swimmer.$.athleteid,
          externalid: swimmer.$.externalid,
          firstName: swimmer.$.firstname,
          lastName: swimmer.$.lastname,
          gender: swimmer.$.gender,
          birthDate: swimmer.$.birthdate,
          clubId: club.$.clubid,
          nation: swimmer.$.nation,
          license: swimmer.$.license,
        });
      });
    });



    const events = (meet.SESSIONS.SESSION || []).flatMap((session, index) => 

        session.EVENTS.EVENT.flatMap(event => {
            let agegroup = toArray(event.AGEGROUPS.AGEGROUP)
            return agegroup.map(age => ({
                id: event.$.eventid,
                gender: event.$.gender,
                stroke: event.SWIMSTYLE.$.stroke,
                distance: event.SWIMSTYLE.$.distance,
                ageGroupId: age.$.agegroupid,
                ageMin: age.$.agemin,
                ageMax: age.$.agemax,
                session: index
            }))
        })
    );

    const results = [];
    (meet.EVENT || []).forEach(event => {
      if (!event.HEAT) return;

      const heats = Array.isArray(event.HEAT) ? event.HEAT : [event.HEAT];

      heats.forEach(heat => {
        const resultsList = Array.isArray(heat.RESULT) ? heat.RESULT : [heat.RESULT];

        resultsList.forEach(res => {
          results.push({
            athleteId: res.$.swimmerid,
            eventId: event.$.id,
            time: res.$.time,
            rank: res.$.rank,
            heat: heat.$.number,
            lane: res.$.lane,
          });
        });
      });
    });

    return {
      competition,
      clubs,
      athletes,
      events,
      results
    };
  });
}

// Exemplo de uso:
parseLenexFile('./exemplo.lef')
  .then(data => {
    console.log('Competição:', data.competition);
    console.log('Clubes:', data.clubs.length);
    console.log('Atletas:', data.athletes.length);
    console.log('Eventos:', data.events.length);
    console.log('Resultados:', data.results.length);
  })
  .catch(err => {
    console.error('Erro ao processar arquivo:', err);
  });
