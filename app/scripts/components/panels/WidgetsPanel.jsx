import _ from 'lodash';
import React, {Component} from 'react';

import {branch} from 'baobab-react/higher-order';

import WidgetPreview from '../widgets/WidgetPreview.jsx';
import classNames from 'classnames';

class WidgetsPanel extends Component {

  render() {
    var widget_thumbs = _.map(this.props.widgets, function( widget, index ){
      return <WidgetPreview widget={widget} key={index} />
    });

    var classes = classNames({
      panel: true,
    });
    return (
      <div className={classes}>
        {widget_thumbs}
      </div>
    );
  }
}

module.exports = branch(WidgetsPanel, {
  cursors: {
    widgets:  ['widgets']
  }
});

