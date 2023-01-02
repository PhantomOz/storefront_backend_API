CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(256) NOT NULL,
    lastname VARCHAR(256) NOT NULL,
    password TEXT NOT NULL
);