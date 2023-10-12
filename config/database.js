require('dotenv').config()
const mongoose = require('mongoose');
const db_url = process.env.DATABASE_URL;

mongoose.connect(db_url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error'));

db.once('open', () => {
    console.log('successfully connected to DB')
})

module.exports = db;