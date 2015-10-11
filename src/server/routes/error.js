'use strict';

import express from 'express';
import debug from 'debug';


const router = express.Router();
const log = debug('error');


router.use((err, req, res, next) => {
  log(err.message, err.stack);
  res.status(500).send('Internal Server Error...Check the logs');
})


export {router as error};