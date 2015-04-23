"use strict";
// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
require('../styles/main.sass');


// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
require("babel/polyfill");

import {root, branch} from './components/baobab/higher-order';
import React from 'react';
import Application from './pages/App';
import stateTree from './stateTree';

window.addEventListener("beforeunload", function(e){
  localStorage.state = JSON.stringify(stateTree);
}, false);

var AppWrapper = branch(Application, {
  cursors:{
    current_page:  ['ui', 'current_page']
  }
});

var RootComponent = root(AppWrapper, stateTree);
React.render( <RootComponent />,  document.getElementById('app') );
