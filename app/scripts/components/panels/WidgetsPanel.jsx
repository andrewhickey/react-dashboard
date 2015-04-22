import _ from 'lodash';
import React, {Component} from 'react';
import {Branch} from 'baobab-react/wrappers';

import stateTree from '../../stateTree.js';
import WidgetPreview from '../widgets/WidgetPreview.jsx';

class WidgetsPanel extends Component {

  render() {
    var widget_thumbs = _.map(this.props.widgets, function( widget, index ){
      return <WidgetPreview widget={widget} key={index} />
    });

    var classes = React.addons.classSet({
      panel: true,
      open: this.props.open
    });
    return (
      <div className={classes}>
        {widget_thumbs}
      </div>
    );
  }
}

class WidgetsPanelContainer extends Component {
  render() {
    console.log(this.context);
    return (
      <Branch 
       cursors={{
        open: ['ui', 'is_widgets_open'],
        widgets: ['widgets']
      }}>
        <WidgetsPanel />
      </Branch>
    );
  }
}

module.exports = WidgetsPanelContainer;

