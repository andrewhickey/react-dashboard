import React, { Component, PropTypes } from 'react';

export default class Widget extends Component {

  renderChart() {
    switch(this.props.widget.type) {
      case "line":  return <div>LineChart</div>;
      case "bar":   return <div>BarChart</div>;
      case "pie":   return <div>PieChart</div>;
      case "radar": return <div>RadarChart</div>;
      default:      return <div>Widget type not found!</div>;    
    }
  }

  render() { 
    return (
      <div className="widget">
        {this.renderChart()}
      </div>
    );
  }

}

Widget.propTypes = {
  widget: PropTypes.object.isRequired
}