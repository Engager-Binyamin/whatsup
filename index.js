require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./DL/db');
db.connect();
app.use(express.json());
const http = require('http');
const router = require('./sendMessage.router'); // נייבא את הראוטר המוגדר בקובץ router.js
const { createServer } = require('./socket'); // כאן מייבאים את createServer ואת המשתנה clients מקובץ ה socket

const server = http.createServer(app);
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use('/sendmessage', router); // ראוט עבור שליחת הודעות



createServer(server)
