CREATE DATABASE teamworkdb;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  nickname TEXT NOT NULL,
  age INT NOT NULL,
  email VARCHAR(30) NOT NULL
);