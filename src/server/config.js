'use strict';

import path from 'path';


// server configuration
export const port = 9966;
export const ui = path.join(__dirname, '../ui');


// database configurations
export const uri = process.env.NODE_ENV !== 'production' ? 'http://localhost:5984' : '';
export const db = process.env.NODE_ENV !== 'production' ? 'test' : 'prod';