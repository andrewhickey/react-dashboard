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
    var offset = this.props.offset || 0;

    // we will use the first scale from the array to calculate tick positions
    var primary_scale = scales[0];
    var domain_min = primary_scale.domain()[0];
    var domain_max = primary_scale.domain()[1];
    var min_x = primary_scale(domain_min);    

    /* create scale legend */
    var legend = _.map(primary_scale.ticks(ticks), function(tick, index) {
      if(tick >= offset) {
        var text_point = this.rotate_point(primary_scale(tick) - (font_size/2), min_x,  min_x, min_x, -90);
        return (
          <text
            fontSize={font_size}
            textAnchor="middle"
            stroke="#FFF"
            strokeWidth={font_size/15} // makes the font appear bold, might cause it to look blurry
            x={text_point.x} y={text_point.y} 
            key={"scale_label_"+index} 
            className="chart-label">
           {tick - offset}
          </text> 
        );
      } else return null;
    },this);

    return (
      <g>
        {legend}
      </g>
    );
  }

});

module.exports = SVGRadarAxes;