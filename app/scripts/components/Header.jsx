import React from 'react';
import UiActions from '../actions/UiActions';

var Header = React.createClass({
  _openPanel: function(panelId, e) {
    if(e) e.preventDefault();
    UiActions.togglePanel(panelId);
  },

  _gotoPage: function(page, e) {
    e.preventDefault();
    UiActions.gotoPage(page);
  },




  render() {
    return (
      <header className="clearfix">
        <span style={{"float":"left"}}>Dashboard</span>
        <nav className="clearfix">
          <div className="nav-item"><a href='#' onClick={this._openPanel.bind(this, "widgets")}>Widgets</a></div>
          <div className="nav-item"><a href='#' onClick={this._openPanel.bind(this, "settings")}>Settings</a></div>
          <div className="nav-item">|</div>
          <div className="nav-item"><a href='#' onClick={this._gotoPage.bind(this,"home")}>Home</a></div>
          <div className="nav-item"><a href='#' onClick={this._gotoPage.bind(this,"reports")}>Reports</a></div>
        </nav>
      </header>
    );
  }

});

module.exports = Header;