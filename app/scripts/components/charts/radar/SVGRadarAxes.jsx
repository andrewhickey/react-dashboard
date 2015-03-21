var _ = require('lodash');
var React = require('react');
var d3 = require('d3');

var ChartMixins = require('../ChartMixins');

var SVGRadarAxes = React.createClass({
  mixins: [ChartMixins],

  render: function() {
    var font_size = 2;
    var scales = this.props.scales;
    var ticks = this.props.ticks || 7;
    var stroke = this.props.stroke || "rgba(73,  81,   88,   1)";
    var offset = this.props.offset || 0;

    // we will use the first scale from the array to calculate tick positions
    var primary_scale = scales[0];
    var domain_min = primary_scale.domain()[0];
    var domain_max = primary_scale.domain()[1];
    var min_x = primary_scale(domain_min);
    var max_x = primary_scale(domain_max);
    
    /* create circles */
    var circles = _.map(primary_scale.ticks(ticks), function(tick, index) {
      return <circle 
        key={index} 
        cx={min_x} cy={min_x} 
        r={ primary_scale(tick) - min_x } 
        stroke={stroke} 
        strokeWidth="0.1" 
        fill="none" 
      />
    });

    /* create lines and labels */
    var x_offset = primary_scale(primary_scale.ticks(ticks)[1]) - min_x; // start at the first tick mark
    var lines = [];
    var labels = [];

    _.each(scales, function(scale, index){
      var rotation = (360/scales.length) * (index);
          rotation -= 90; // start at top of chart
      var start_point = this.rotate_point(min_x + x_offset, min_x,  min_x, min_x, rotation);
      var end_point = this.rotate_point(max_x, min_x,  min_x, min_x, rotation);
      var text_point = this.rotate_point(max_x+2, min_x,  min_x, min_x, rotation);
      
      var text_anchor = "";
      if(start_point.x === min_x) text_anchor = "middle";
      if(start_point.x < min_x) text_anchor = "end";
      if(start_point.x > min_x) text_anchor = "start";

/*      labels.push(
        <text 
          fontSize={font_size}
          textAnchor={text_anchor}
          x={text_point.x} y={text_point.y} 
          key={index} 
          className="chart-label"
          onClick={scale.label.onClick}
          style={{cursor: (scale.label.onClick ? 'pointer' : 'default')}}>
         {scale.label.value}
        </text> );*/

      lines.push(
        <line 
          key={index} 
          x1={start_point.x} y1={start_point.y}
          x2={end_point.x} y2={end_point.y}
          stroke={stroke} strokeWidth="0.3"
        /> );
    },this);

    return (
      <g>
        {circles}
        {lines}
        {labels}
      </g>
    );
  }

});

module.exports = SVGRadarAxes;