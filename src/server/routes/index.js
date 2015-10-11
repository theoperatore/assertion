'use strict';

///////////////////////////////////////////////////////////////////////////////
//
// Aggregate route files here to allow easy es6 destructure importing:
//
//   import {api, error, notfound} from './routes';
//
//   app.use('/api', api);
//   app.use(notfound);
//   app.use(error);
//
// etc...
//
///////////////////////////////////////////////////////////////////////////////
export * from './api';
export * from './logger';
export * from './notfound';
export * from './error';
