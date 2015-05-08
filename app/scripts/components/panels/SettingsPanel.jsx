import _ from "lodash";
import React, {Component} from "react";
import {branch} from 'baobab-react/higher-order';
import classNames from 'classnames';

class WidgetsPanel extends Component {
  _onSubmit(e) {

  }

  updateSetting(setting_name, e) {

  }

  render() {
    const {open, settings} = this.props;

    var classes = classNames({
      panel: true,
    });

    return (
      <div className={classes}>
        <form onSubmit={this._onSubmit}>
          <div>
            <input type="text" id="uri-input" value={settings.uri} onChange={this.updateSetting}/>
            <label htmlFor="uri-input">LRS Uri</label>
          </div>
          <div>
            <input type="text" id="username-input" value={settings.username} onChange={this.updateSetting}/>
            <label htmlFor="username-input">LRS Username</label>
          </div>
          <div>
            <input type="password" id="password-input" value={settings.password} onChange={this.updateSetting}/>
            <label htmlFor="password-input">LRS Password</label>
          </div>
        </form>
      </div>
    );
  }
}

export default branch(WidgetsPanel, {
  cursors: {
    settings: ["settings", "lrs"]
  }
})