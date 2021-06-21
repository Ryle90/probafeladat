import express from 'express';

import loginControll from './loginControll.js';
import sendError from './error.js';
import authControll from './authControll.js';

import data from './data.js';

const app = express();
const port = 3000;

app.use(express.json())

app.post('/login', (req, res) => {
    const data = req.body;
    if (loginControll(data)) {
        res.json({token: 'aasdsa122434321k2o3lji2j3'})
    } else sendError(res)
})

app.get('/data', (req, res) => {
    const authToken = req.headers['x-api-key']
    if (authControll(authToken)) {
        res.json(JSON.stringify(data))
    } else sendError(res)
})

app.listen(port, () => {
    console.log(`App listens on ${port}`)
})