import React, {Component} from 'react';
import WidgetsPanel from './WidgetsPanel.jsx';
import SettingsPanel from './SettingsPanel.jsx';

class PanelsContainer extends Component {

  render() {
    return (
      <div>
        <WidgetsPanel />
        <SettingsPanel />
      </div>
    );
  }

};

module.exports = PanelsContainer;