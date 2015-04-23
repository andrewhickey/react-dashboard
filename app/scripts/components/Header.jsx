import React from 'react';
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

  _gotoPage: function(page, e) {
    e.preventDefault();
    UiActions.gotoPage(page);
  },



  render() {
    return (
      <header className="clearfix">
        Dashboard
        <nav className="clearfix">
          <div className="nav-item"><a href='#' onClick={this._openWidgetsPanel}>Widgets</a></div>
          <div className="nav-item"><a href='#' onClick={this._openSettingsPanel}>Settings</a></div>
          <div className="nav-item"><a href='#' onClick={this._gotoPage.bind(this,"home")}>Home</a></div>
          <div className="nav-item"><a href='#' onClick={this._gotoPage.bind(this,"reports")}>Reports</a></div>
        </nav>
      </header>
    );
  }

});

module.exports = Header;