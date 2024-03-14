require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./DL/db');
db.connect();
app.use(express.json());
const {createServer} = require('./socket');
const http = require('http');

const server = http.createServer(app);
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}));

const { route } = require('./router.sendMessage');


// const  miriamTest  = require('./msgQueue.service2');
// app.use('/miriamTest', miriamTest)



createServer(server)
