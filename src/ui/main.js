'use strict';

import {debounce, strip} from './utils';
import {Promise}from 'es6-promise';
import Editor from './editor';
import * as gateway from './gateway';

const editor = Editor();
const formGroup = document.querySelector('.form-group');
const inputName = document.querySelector('#assertion-name');
const nameUrl = document.querySelector('#assertion-name-url');
const nameRlt = document.querySelector('#assertion-name-result');
const btnClear = document.querySelector('#btn-clear');
const btnCreate = document.querySelector('#btn-create');
const msgCreate = document.querySelector('#msg-create');


const checkUnique = debounce((val, cb) => {
  console.log(`checking: ${val}`);
  gateway.unique(val).then(body => cb(null, body.status)).catch(err => cb(err, null));
}, 500);

const handleUnique = (err, status) => {
  if (err) {
    console.log(err.message);
    formGroup.classList.remove('has-feedback', 'has-success');
    formGroup.classList.add('has-error'); 
    return;
  }

  formGroup.classList.add('has-feedback', 'has-success');
  formGroup.classList.remove('has-error');

  console.log(`status from be: ${status}`)
}

btnCreate.disabled = false;


inputName.addEventListener('input', ev => {
  let val = strip(inputName.value)

  checkUnique(val, handleUnique);
  formGroup.classList.remove('has-error', 'has-success');
  nameUrl.innerHTML = `http://assertion.me/${val}`;
})


btnClear.addEventListener('click', ev => {
  editor.setValue(`'use strict';\n\nlet expect = chai.expect;\n\n`);
})


btnCreate.addEventListener('click', () => {
  let name = strip(inputName.value);
  let code = editor.getValue();

  // disable this button
  btnCreate.innerHTML = 'Creating...';
  btnCreate.disabled = true;

  // POST to backend
  gateway.create({name, code}).then(status => {
    console.error(status);
    btnCreate.innerHTML = 'Done';

    let div = document.createElement('div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let a = document.createElement('a');

    div.classList.add('alert', 'alert-success');
    p1.innerHTML = 'Yes! Your test is all saved and ready to be hammered on:';
    a.href = `http://localhost:9966/${name}`;
    a.innerHTML = `http://assertion.me/${name}`;
    p2.appendChild(a);
    p3.innerHTML = 'Happy Testing!';

    div.appendChild(p1);
    div.appendChild(p2);

    while (msgCreate.firstChild) {
      msgCreate.removeChild(msgCreate.firstChild);
    }
  
    msgCreate.appendChild(div);
    msgCreate.appendChild(p3);

  }).catch(err => {
    console.error(err.message);
    btnCreate.innerHTML = 'Error';
    btnCreate.classList.add('btn-danger');
    btnCreate.classList.remove('btn-success');
    btnCreate.disabled = false;

    let div = document.createElement('div');
    let p1 = document.createElement('p');

    div.classList.add('alert', 'alert-danger');
    p1.innerHTML = 'Gah! There was a problem with creating your tests. Try again!';

    div.appendChild(p1);

    while (msgCreate.firstChild) {
      msgCreate.removeChild(msgCreate.firstChild);
    }

    msgCreate.appendChild(div);
  })
})
