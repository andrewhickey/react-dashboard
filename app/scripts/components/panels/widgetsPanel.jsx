import _ from 'lodash';
import stateTree from '../../stateTree.js';
import React from 'react';
import WidgetPreview from '../widgets/widgetPreview.jsx';

var WidgetsPanel = React.createClass({
  mixins: [stateTree.mixin],
  cursors: {
    open: ['ui', 'is_widgets_open'],
    widgets: ['widgets']
  },
  
  render: function () {
    var widget_thumbs = _.map(this.state.cursors.widgets, function( widget, index ){
      return <WidgetPreview widget={widget} key={index} />
    });

    var classes = React.addons.classSet({
      panel: true,
      open: this.state.cursors.open
    });
    return (
      <div className={classes}>
        {widget_thumbs}
      </div>
    );
  }
});

module.exports = WidgetsPanel;