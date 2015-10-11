'use strict';

export function debounce(fn, time) {
  let id;

  return function (...args) {
    let me = this;
    clearTimeout(id);
    id = setTimeout(() => {
      fn.apply(me, args);
    }, time);
  }
}

export function strip(val) {
  let out = val.toLowerCase().trim();

  out = out.replace(/[\s+\W+]+$/g, '')
  out = out.replace(/[\s+\W+]+/g, '-');

  return out;
}