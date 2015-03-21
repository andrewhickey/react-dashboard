import React from 'react';
import { PropTypes } from 'react';

var Widget = React.createClass({

  propTypes: {
    widget: PropTypes.object.isRequired
  },

  render() {
    var component = null;
    switch(this.props.widget.type) {
      case "line":
        component = <div className="widget">LineChart</div>;
        break;

      case "bar":
        component = <div className="widget">BarChart</div>;
        break;

      case "pie":
        component = <div className="widget">PieChart</div>;
        break;

      case "radar":
        component = <div className="radar">RadarChart</div>;
        break;

      default:
        component = <div className="widget">Widget type not found!</div>;
        break;
    }
    
    return component;
  }

});

module.exports = Widget;