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






const db = require('./DL/db')

// const app = express();
// db.connect();
// const miriamTest = require('./msgQueue.service2')
// app.use('/miriamTest', miriamTest)



// server.listen(3000, () => {
//     console.log('Server is running on port 3000');
// })

// app.listen(port, () => { console.log("Listening on port " + port) })


createServer(server)
