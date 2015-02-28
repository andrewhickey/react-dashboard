import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../components/header.jsx'
import PanelsContainer from '../components/panels/panelsContainer.jsx'

var App = React.createClass({
  
  render() {
    return (
      <div className="app-container">
        <Header />
        <PanelsContainer />
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
  
});

module.exports = App;