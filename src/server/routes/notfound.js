'use strict';

import express from 'express';
const router = express.Router();

router.use((req, res, next) => {
  res.status(404).send(`the resource you've requested doesn't exist...in this universe...`);
});


export {router as notfound};