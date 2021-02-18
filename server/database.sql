CREATE DATABASE teamworkdb;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  nickname TEXT,
  age INT,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL
);