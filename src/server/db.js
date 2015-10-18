'use strict';

import nano from 'nano';
import debug from 'debug';

const log = debug('db');

///////////////////////////////////////////////////////////////////////////////
//
// This just returns a configured nano object that points to the database
// that is currently in use according to the config file.
//
// technically there 
//
///////////////////////////////////////////////////////////////////////////////
export default config => {
  let handle = nano(config.uri);

  // do other stuff
  log(`returning handle to database: ${config.db}`);

  return handle.use(config.db);
}