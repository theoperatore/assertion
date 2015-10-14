'use strict';


import express from 'express';
import debug from 'debug';


const log = debug('api');
const api = express.Router();


api.use((req, res, next) => {
  log(`[${req.method}] ${req.originalUrl}`);
  next();
})


api.put('/names', (req, res) => {
  res.status(501).end();
})


api.post('/tests', (req, res) => {
  res.status(501).end();
})


export {api as api};