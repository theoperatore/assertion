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


  // if dev mode...destroy current db and bootstrap it on each fire-up
  if (process.env.NODE_ENV !== 'production') {
    handle.db.list((listErr, databases) => {
      if (!listErr) {
        var exists = databases.filter(b => b === config.db).length > 0;

        if (!exists) {
          handle.db.create(config.db, err => {
            if (!err) {
              log(`created database: ${config.db}`);
              return;
            }

            log(err);
          })
        }

        else {
          log(`database: ${config.db} already exists.`);
          log('run:\n')
          log(`    $ assertion-db destroy ${config.db}`);
          log('\nto remove the database and build it again.');
        }
      }
    })
  }


  return handle.use(config.db);
}