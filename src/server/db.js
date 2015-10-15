'use strict';

import debug from 'debug';
import nano from 'nano';

const log = debug('db');

export default config => {
  const instance = nano(config.uri);

  return instance.db.use(config.db);
}