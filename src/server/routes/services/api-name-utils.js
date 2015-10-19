'use strict';

import crypto from 'crypto';

// crypto hashing function
function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

// normalize before hasing
function normalize(text) {
  return text.toLowerCase().trim().replace(/[\s+\W+]+$/g, '').replace(/[\s+\W+]+/g, '-');
}

// returns false on text containing non-alphanumeric characters
function validate(text) {
  return text.match(/[^\s\w]|\_/g);
}

// returns true if there is a duplicate id in docs collecdtion
function duplicate(id, docs) {
  return docs.filter(doc => doc.id === id).length > 0;
}

export {md5, normalize, validate, duplicate};