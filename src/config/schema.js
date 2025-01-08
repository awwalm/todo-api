const schema = `
CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME??'todos_db'};
USE ${process.env.DB_NAME??'todos_db'};

CREATE TABLE IF NOT EXISTS todos (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  createdAt DATETIME NOT NULL,
  INDEX idx_title (title),
  INDEX idx_completed (completed)
);
`;

module.exports = schema;