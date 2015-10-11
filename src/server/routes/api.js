'use strict';


import express from 'express';
import debug from 'debug';


const log = debug('api');
const api = express.Router();

const tempdb = {};

api.use((req, res, next) => {
  log(`[${req.method}] ${req.originalUrl}`);
  next();
})


api.put('/names', (req, res) => {
  if (tempdb.hasOwnProperty(req.body.name)) {
    res.status(409).json({ status: 'NOT_UNIQUE' });
    return;
  }

  tempdb[req.body.name] = req.body.name;
  res.status(200).json({ status: 'ok' });
})


api.post('/tests', (req, res) => {
  res.json({ status: 'ok' });
})


export {api as api};