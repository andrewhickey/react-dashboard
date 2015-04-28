import React, {Component} from 'react';
import WidgetsPanel from './WidgetsPanel.jsx';
import SettingsPanel from './SettingsPanel.jsx';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';

class PanelsContainer extends Component {
  
  render() {
    const { currentPage } = this.props;
    const panels = _.map(currentPage.panels, function(panel, index){
      if(panel.isOpen) return this.getPanelFromType(index);
    }, this);

    return (
      <div>
        {panels}
      </div>
    );
  }

  getPanelFromType(type) {
    switch(type) {
      case "widgets": return <WidgetsPanel key={type} />;
      case "settings": return <SettingsPanel key={type} />;
    }
  }

};

module.exports = branch(PanelsContainer, {
  facets: {
    currentPage: "currentPage"
  }
});