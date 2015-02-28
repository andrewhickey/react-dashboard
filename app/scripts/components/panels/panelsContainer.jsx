import React from 'react';
import WidgetsPanel from './widgetsPanel.jsx';

var PanelsContainer = React.createClass({

  render: function () {
    return (
      <div>
        <WidgetsPanel />
      </div>
    );
  }
});

module.exports = PanelsContainer;