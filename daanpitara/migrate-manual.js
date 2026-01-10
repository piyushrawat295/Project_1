const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function migrate() {
  try {
    await client.connect();
    console.log('Connected to DB...');

    // Create Enum
    try {
      await client.query("CREATE TYPE role AS ENUM ('admin', 'ngo', 'user');");
      console.log('Created type role');
    } catch (e) {
      if (e.code === '42710') {
        console.log('Type role already exists, skipping.');
      } else {
        throw e;
      }
    }

    // Create Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role role NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log('Created table users');

    await client.end();
  } catch (err) {
    console.error('Migration error', err);
    process.exit(1);
  }
}

migrate();
