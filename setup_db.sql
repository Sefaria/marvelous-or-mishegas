CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL, --bcrypted password
    last_ip INET NOT NULL,
    is_admin BOOLEAN DEFAULT false
    );


CREATE TABLE IF NOT EXISTS ideas (
    idea_id serial PRIMARY KEY,
    user_id serial,
    idea_text CHAR(280) NOT NULL,
    weight smallint DEFAULT 1,
    date_created TIMESTAMP,
    view_count integer NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS votes (
    vote_id serial PRIMARY KEY,
    vote_type smallint NOT NULL,
    date_created TIMESTAMP,
    user_id serial,
    idea_id serial NOT NULL,
    ip inet NOT NULL,
    FOREIGN KEY (idea_id)
        REFERENCES ideas(idea_id),
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);