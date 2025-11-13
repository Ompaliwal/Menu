// scripts/seed.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please set MONGODB_URI in .env');
  process.exit(1);
}

async function run() {
  // NO legacy options here — just create client with the URI
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();

    // Prefer DB name in URI path (if present), otherwise fallback to 'menu'
    let dbName = 'menu';
    try {
      const parsed = new URL(MONGODB_URI.split('?')[0]);
      if (parsed.pathname && parsed.pathname.length > 1) {
        dbName = parsed.pathname.replace('/', '');
      }
    } catch (e) {
      // ignore, use default dbName
    }

    const db = client.db(dbName);
    const coll = db.collection('menus');

    const filePath = path.join(__dirname, '..', 'data', 'menu.json'); // adjust if your json lives elsewhere
    if (!fs.existsSync(filePath)) {
      console.error('menu.json not found at', filePath);
      process.exit(1);
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);

    if (!data.slug) {
      throw new Error('menu.json missing slug');
    }

    const filter = { slug: data.slug };
    const updateDoc = { $set: data };
    await coll.updateOne(filter, updateDoc, { upsert: true });

    console.log('Seed complete ✅');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
