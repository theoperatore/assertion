'use strict';

import Editor from './editor';

let editor = Editor();
let results = document.querySelector('iframe');
let run = document.querySelector('#run');
let clear = document.querySelector('#clear');


const send = msg => {
  results.contentWindow.postMessage(msg, '*');
}


run.addEventListener('click', ev => {
  send({type: 'eval', content: editor.getValue()});
});


clear.addEventListener('click', ev => {
  editor.setValue('\'use strict;\'\n\n');
})