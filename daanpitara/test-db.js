const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function test() {
  try {
    await client.connect();
    console.log('Connected successfully');
    const res = await client.query('SELECT NOW()');
    console.log('Time:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error', err);
  }
}

test();
