import React from 'react';
import { Link } from 'react-router';
import UiActions from '../actions/UiActions';

var Header = React.createClass({
  _openWidgetsPanel: function(e) {
    e.preventDefault();
    UiActions.toggleWidgetsPanel();
  },

  _openSettingsPanel: function(e) {
    e.preventDefault();
    UiActions.toggleSettingsPanel();
  },

  render() {
    return (
      <header className="clearfix">
        Dashboard
        <nav className="clearfix">
          <div className="nav-item"><a href='#' onClick={this._openWidgetsPanel}>Widgets</a></div>
          <div className="nav-item"><a href='#' onClick={this._openSettingsPanel}>Settings</a></div>
          <div className="nav-item"><Link to='home'>Home</Link></div>
          <div className="nav-item"><Link to='reports'>Reports</Link></div>
        </nav>
      </header>
    );
  }

});

module.exports = Header;