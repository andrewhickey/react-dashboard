import _ from "lodash";
import stateTree from "../../stateTree.js";
import React from "react";

var WidgetsPanel = React.createClass({
  mixins: [stateTree.mixin],
  cursors: {
    open: ["ui", "is_settings_open"],
    settings: ["settings", "lrs"]
  },
  
  _onSubmit(e) {

  },

  updateSetting(setting_name, e) {

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
            <input type="text" id="uri-input" value={this.state.cursors.settings.uri} onChange={this.updateSetting}/>
            <label htmlFor="uri-input">LRS Uri</label>
          </div>
          <div>
            <input type="text" id="username-input" value={this.state.cursors.settings.username} onChange={this.updateSetting}/>
            <label htmlFor="username-input">LRS Username</label>
          </div>
          <div>
            <input type="password" id="password-input" value={this.state.cursors.settings.password} onChange={this.updateSetting}/>
            <label htmlFor="password-input">LRS Password</label>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = WidgetsPanel;