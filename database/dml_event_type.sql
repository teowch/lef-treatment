-- Eventos individuais
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FLY', 25, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BACK', 25, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BREAST', 25, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 25, false);

INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 50, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 100, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 200, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 400, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 800, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 1500, false);

INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BACK', 50, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BACK', 100, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BACK', 200, false);

INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BREAST', 50, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BREAST', 100, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('BREAST', 200, false);

INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FLY', 50, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FLY', 100, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FLY', 200, false);

INSERT INTO event_type (stroke, distance, is_relay) VALUES ('MEDLEY', 100, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('MEDLEY', 200, false);
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('MEDLEY', 400, false);

-- Revezamentos (Relays)
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 200, true);  -- 4x50m
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 400, true);  -- 4x100m
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('FREE', 800, true);  -- 4x200m

INSERT INTO event_type (stroke, distance, is_relay) VALUES ('MEDLEY', 200, true);      -- 4x50m MEDLEY Relay
INSERT INTO event_type (stroke, distance, is_relay) VALUES ('MEDLEY', 400, true);      -- 4x100m MEDLEY Relay
