let result = document.querySelector('#results');

      
const print = msg => {
  result.innerHTML = `[results] ${msg}`;
}


const printTrace = (msg, trace) => {
  result.innerHTML = `[results] FAILURE: ${msg}\n\n${trace}`;
}


const evaluateCode = code => {
  let previous = document.querySelector('#user-code');

  if (previous) {
    document.body.removeChild(previous);
  } 

  let script = document.createElement('script');
  script.type='text/javascript';
  script.id = 'user-code';

  try {
    var result = babel.run(code);
    console.log(result);
    print('All Tests Pass!');
  }
  catch (e) {
    printTrace(e.message, e.stack);
    console.log(e);
    return;
  }
}


window.addEventListener('message', ev => {
  switch(ev.data.type) {
    case 'eval': 
      evaluateCode(ev.data.content);
      break;
    case 'message':
      print(ev.data.content);
      break;
    default:
      print('unknown');
      break;
  }
})