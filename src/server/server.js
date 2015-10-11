'use strict';


import express from 'express';
import debug from 'debug';


import * as config from './config';
import {api, logger, error, notfound} from './routes';


const app = express();
const log = debug('server');
const prt = process.env.PORT || config.port;


// server routes
app.use(logger);
app.use(express.static(config.ui));
app.use('/api', api);
app.use(notfound);
app.use(error);


// engage and export the server
const server = app.listen(prt, () => log(`server listening on port ${prt}`));


export { server };