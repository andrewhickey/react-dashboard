import React from 'react';
import WidgetsPanel from './WidgetsPanel.jsx';
import SettingsPanel from './SettingsPanel.jsx';

var PanelsContainer = React.createClass({

  render: function () {
    return (
      <div>
        <WidgetsPanel />
        <SettingsPanel />
      </div>
    );
  }
});

module.exports = PanelsContainer;