const fs = require('fs');
const xml2js = require('xml2js');

const toArray = val => (val == null ? [] : Array.isArray(val) ? val : [val]);

const parser = new xml2js.Parser({ explicitArray: false });

const writeOut = (txt) => {
  fs.writeFileSync('./out.txt', txt, 'utf-8');
}

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
      shortname: club.$.shortname,
      region: club.$.region
    }));


    const athletes = [];
    const results = [];
    const splits = [];
    (meet.CLUBS.CLUB || []).forEach(club => {
      if (!club.ATHLETES || !club.ATHLETES.ATHLETE) return;

      const swimmers = toArray(club.ATHLETES.ATHLETE);

      swimmers.forEach(swimmer => {
        if (swimmer.RESULTS && Array.isArray(swimmer.RESULTS.RESULT)) {
          swimmer.RESULTS.RESULT.forEach(res => {
            if (!res.$.heatid && !res.$.distance) return; // Ignora resultados sem heatid e distance
            results.push({
              resultId: res.$.resultid,
              heatId: res.$.heatid,
              lane: res.$.lane,
              entryTime: res.$.entrytime,
              swimtime: res.$.swimtime,
              points: res.$.points,
              swrid: swimmer.$.swrid,
              athleteid: swimmer.$.athleteid,
              externalid: swimmer.$.externalid
            });

            if (res.SPLITS) {
              toArray(res.SPLITS.SPLIT).forEach(split => {
                splits.push({
                  resultId: res.$.resultid,
                  distance: split.$.distance,
                  swimtime: split.$.swimtime,
                })
              });
            }
          })
        }
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

      if (club.RELAYS && club.RELAYS.RELAY) {
        const relays = toArray(club.RELAYS.RELAY);

        relays.forEach(relay => {
          if (relay.RESULTS && relay.RESULTS.RESULT) {
            const relayResults = toArray(relay.RESULTS.RESULT);

            relayResults.forEach(res => {
              const relayPositions = [];

              if (res.RELAYPOSITIONS && res.RELAYPOSITIONS.RELAYPOSITION) {
                toArray(res.RELAYPOSITIONS.RELAYPOSITION).forEach(relayPos => {
                  relayPositions.push({
                    position: Number(relayPos.$.number),
                    athleteid: relayPos.$.athleteid
                  });
                });
              }

              results.push({
                resultId: res.$.resultid,
                heatId: res.$.heatid,
                lane: res.$.lane,
                entryTime: res.$.entrytime,
                swimtime: res.$.swimtime,
                points: res.$.points,
                swrid: null,
                athleteid: null,
                externalid: null,
                relayPositions: relayPositions
              });


              // Captura de splits do revezamento
              if (res.SPLITS && res.SPLITS.SPLIT) {
                toArray(res.SPLITS.SPLIT).forEach(split => {
                  splits.push({
                    resultId: res.$.resultid,
                    distance: split.$.distance,
                    swimtime: split.$.swimtime
                  });
                });
              }
            });
          }
        });
      }
    });

    const sessions = toArray(meet.SESSIONS.SESSION).map((session, index) => ({
      order: Number(session.$.number), // || index + 1,  // Caso o LENEX não traga o order, usamos o índice
      date: session.$.date
    }));

    let heats = []
    const events = toArray(meet.SESSIONS.SESSION).flatMap((session) => 

        toArray(session.EVENTS.EVENT).flatMap(event => {
            let agegroup = toArray(event.AGEGROUPS.AGEGROUP) || [];
            if (event.HEATS && event.HEATS.HEAT) {
              toArray(event.HEATS.HEAT).forEach(heat => {
                heats.push({
                  eventId: event.$.eventid,
                  heatId: heat.$.heatid,
                  heatNumber: heat.$.number,
                  heatOrder: heat.$.order,
                  heatDayTime: heat.$.daytime,
                  heatStatus: heat.$.status,
                });
              });
            }
            const relayCount = Number(event.SWIMSTYLE.$.relaycount) || 1;
            const distancePerAthlete = Number(event.SWIMSTYLE.$.distance);
            const isRelay = relayCount === 4;
            const totalDistance = isRelay ? (distancePerAthlete * relayCount) : distancePerAthlete;
            
            let event_ = {
                eventId: event.$.eventid,
                gender: event.$.gender,
                stroke: event.SWIMSTYLE.$.stroke,
                distance: totalDistance,
                ageGroups: [],
                session: Number(session.$.number),
                isRelay: isRelay
            }
            agegroup.map(age => {
              event_.ageGroups.push({
                ageGroupId: age.$.agegroupid,
                ageMin: age.$.agemin,
                ageMax: age.$.agemax
              })
            })
            return event_;
        })
    );

    return {
      competition,
      clubs,
      athletes,
      events,
      heats,
      results,
      splits,
      sessions
    };
  });
}

module.exports = {
  parseLenexFile,
}