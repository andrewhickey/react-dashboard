import React from 'react';
import Router from 'react-router';
import routes from './routes';
import stateTree from './stateTree';

window.addEventListener("beforeunload", function(e){
   localStorage.state = JSON.stringify(stateTree);
}, false);

Router.run(routes, Handler => React.render(<Handler />, document.body));