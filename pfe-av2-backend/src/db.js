const mysql = require("mysql2/promise");

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\``
    );

    const db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log("Connected to database");

    await db.execute(
      `CREATE TABLE IF NOT EXISTS clients (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        phone VARCHAR(20) NULL,
        birthDate DATE NOT NULL,
        civilStatus VARCHAR(50) NOT NULL,
        education VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )`
    );

    await db.execute(
      `CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        deadline INT NOT NULL
      )`
    );

    await db.execute(
      `CREATE TABLE IF NOT EXISTS requests (
        id CHAR(36) NOT NULL PRIMARY KEY,
        price DECIMAL(10, 2) NOT NULL,
        serviceDeadline INT NOT NULL,
        scheduledDate DATE NOT NULL,
        status VARCHAR(50) NOT NULL,
        requestDate DATE NOT NULL,
        requestNumber INT NOT NULL UNIQUE,
        clientId CHAR(36),
        serviceId INT,
        FOREIGN KEY (clientId) REFERENCES clients(id),
        FOREIGN KEY (serviceId) REFERENCES services(id)
      )`
    );

    console.log("Tables created");

    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connectToDatabase };
