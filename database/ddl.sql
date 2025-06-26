CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competitions (
    competition_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(255),
    nation VARCHAR(50),
    start_date DATE,
    end_date DATE,
    course VARCHAR(50)
);

CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    competition_id INT NOT NULL,
    session_order INT,
    session_date DATE,
    FOREIGN KEY (competition_id) REFERENCES competitions(competition_id)
);

CREATE TABLE clubs (
    club_id SERIAL PRIMARY KEY,
    swrid VARCHAR(50),
    name VARCHAR(255),
    shortname VARCHAR(100),
    code VARCHAR(50),
    nation VARCHAR(50),
    region VARCHAR(50)
);

CREATE TABLE athletes (
    athleteid SERIAL PRIMARY KEY,
    swrid VARCHAR(50),
    externalid VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender CHAR(1),
    birth_date DATE,
    clubid INT NOT NULL,
    nation VARCHAR(50),
    license VARCHAR(50),
    FOREIGN KEY (clubid) REFERENCES clubs(club_id)
);

CREATE TABLE event_type (
    event_type_id SERIAL PRIMARY KEY,
    stroke VARCHAR(50),
    distance INT,
    is_relay BOOLEAN NOT NULL
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    session_id INT NOT NULL,
    gender CHAR(1),
    event_type_id INT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id),
    FOREIGN KEY (event_type_id) REFERENCES event_type(event_type_id)
);

CREATE TABLE agegroups (
    agegroup_id SERIAL PRIMARY KEY,
    agemin INT,
    agemax INT
);

CREATE TABLE events_agegroups (
    event_id INT NOT NULL,
    agegroup_id INT NOT NULL,
    PRIMARY KEY (event_id, agegroup_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (agegroup_id) REFERENCES agegroups(agegroup_id)
);

CREATE TABLE heats (
    heatid SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    heat_number INT,
    heat_order INT,
    heat_daytime VARCHAR(50),
    heat_status VARCHAR(50),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE results (
    resultid SERIAL PRIMARY KEY,
    heatid INT NOT NULL,
    lane INT,
    entry_time VARCHAR(20),
    swimtime VARCHAR(20),
    points INT,
    swrid VARCHAR(50),
    athleteid INT,
    externalid VARCHAR(50),
    FOREIGN KEY (heatid) REFERENCES heats(heatid),
    FOREIGN KEY (athleteid) REFERENCES athletes(athleteid)
);

CREATE TABLE splits (
    split_id SERIAL PRIMARY KEY,
    result_id INT NOT NULL,
    distance INT,
    swimtime VARCHAR(20),
    FOREIGN KEY (result_id) REFERENCES results(resultid)
);

CREATE TABLE relay_positions (
    relay_position_id SERIAL PRIMARY KEY,
    result_id INT NOT NULL,
    position INT NOT NULL,
    athlete_id INT NOT NULL,
    FOREIGN KEY (result_id) REFERENCES results(resultid),
    FOREIGN KEY (athlete_id) REFERENCES athletes(athleteid)
);