import express from 'express';
import cors from 'cors';

import loginControll from './loginControll.js';
import sendError from './error.js';
import authControll from './authControll.js';

import data from './data.js';

const app = express();

app.use(express.json());
app.use(cors())

app.post('/login', (req, res) => {
    const data = req.body;
    console.log(data)
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

export default app