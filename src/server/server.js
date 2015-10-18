'use strict';


import express from 'express';
import debug from 'debug';

import parser from 'body-parser';
import * as config from './config';
import {api, logger, error, notfound} from './routes';
import db from './db';


const log = debug('server');
const app = express();
const port = config.port;


// module wide properties
app.locals.db = db(config);


// middleware
app.use(parser.json());


// server routes
app.use(logger);
app.use(express.static(config.ui));
app.use('/api', api);
app.use(notfound);
app.use(error);


// engage and export the server
const server = app.listen(port, () => log(`listening on port ${port}`));


export default server;