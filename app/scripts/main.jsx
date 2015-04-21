"use strict";
// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
require('../styles/main.sass');


// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require("babel/polyfill");

import {Root} from 'baobab-react/wrappers';
import React from 'react';
import Application from './pages/app';
import stateTree from './stateTree';

window.addEventListener("beforeunload", function(e){
  localStorage.state = JSON.stringify(stateTree);
}, false);

React.render(
  (
    <Root tree={stateTree}>
      <Application />
    </Root>
  ),
  document.getElementById('app')
);
