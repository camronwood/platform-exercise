// THIS IS JUST A HELPER SCRIPT TO BUILD THE DB
const { Client } = require('pg');

const database = 'fender_auth';

// Set config for database connection
const clientConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const createDatabase = async () => {
  const client = new Client(clientConfig);

  const con = client.connect();
  const createDatabaseQuery = `CREATE DATABASE ${database}`;

  con.then(() => {
    client
      .query(createDatabaseQuery)
      .then(() => {
        console.log('fender-auth database was successfully created');
        clientConfig.database = 'fender_auth';
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => {
        client.end();
      });
  });
};

const createUserTable = async () => {
  clientConfig.database = database;

  const client = new Client(clientConfig);
  const con = client.connect();
  const userTableSchema = 'id SERIAL PRIMARY KEY, username varchar (50) UNIQUE, password varchar (128), email varchar (50) UNIQUE, name varchar, "createdAt" date, "updatedAt" date';
  const userTableQuery = `DROP TABLE IF EXISTS users; CREATE TABLE users (${userTableSchema})`;

  con.then(() => {
    client
      .query(userTableQuery)
      .then(() => {
        console.log('user tabel was successfully created');
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => {
        client.end();
      });
  });
};

const databaseUp = async () => {
  await createDatabase();
  await createUserTable();
};

databaseUp();
