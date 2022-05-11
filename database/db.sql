CREATE DATABASE clubee_fe IF NOT EXISTS;

use clubee_fe;

CREATE TABLE articles(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title TEXT,
  description TEXT,
  email TEXT
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

describe articles;