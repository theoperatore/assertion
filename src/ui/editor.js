'use strict';

export default () => {
  let editor = ace.edit('editor');

  editor.setTheme('ace/theme/tomorrow_night');
  editor.getSession().setMode('ace/mode/javascript');
  editor.getSession().setTabSize(2);
  editor.getSession().setUseSoftTabs(true);
  editor.getSession().setUseWorker(false);

  return editor;  
}

