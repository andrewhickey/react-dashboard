import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../components/Header.jsx'
import PanelsContainer from '../components/panels/PanelsContainer.jsx'

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