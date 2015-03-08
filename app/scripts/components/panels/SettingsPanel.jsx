import _ from 'lodash';
import stateTree from '../../stateTree.js';
import React from 'react';

var WidgetsPanel = React.createClass({
  mixins: [stateTree.mixin],
  cursors: {
    open: ['ui', 'is_settings_open'],
    settings: ['settings']
  },
  
  _onSubmit(e) {

  },

  render() {
    var classes = React.addons.classSet({
      panel: true,
      open: this.state.cursors.open
    });
    return (
      <div className={classes}>
        <form onSubmit={this._onSubmit}>
          <div>
            <input type="text" id="username-input" value={this.state.cursors.settings.lrs_username}/>
            <label htmlFor="username-input">LRS Username</label>
          </div>
          <div>
            <input type="password" id="password-input" value={this.state.cursors.settings.lrs_password}/>
            <label htmlFor="password-input">LRS Password</label>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = WidgetsPanel;