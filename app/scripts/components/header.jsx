import React from 'react';
import { Link } from 'react-router';
import uiActions from '../actions/uiActions';

var Header = React.createClass({
  _openWidgetsPanel: function(e) {
    e.preventDefault();
    uiActions.toggleWidgetsPanel();
  },

  render() {
    return (
      <header className="clearfix">
        Dashboard
        <nav className="clearfix">
          <div className="nav-item"><Link to='home'>Home</Link></div>
          <div className="nav-item"><a href='#' onClick={this._openWidgetsPanel}>Widgets</a></div>
          <div className="nav-item"><Link to='info'>Info</Link></div>
        </nav>
      </header>
    );
  }

});

module.exports = Header;