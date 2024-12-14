const mongoose = require("mongoose");
const config = require(".");

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('connected', () => console.log('database connected'));
mongoose.connection.on('error', (err) => console.log('database connection error', err));