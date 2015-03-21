var _ = require('lodash');
var React = require('react');
var d3 = require('d3');

var ChartMixins = require('../ChartMixins');

var SVGRadarLabels = React.createClass({
  mixins: [ChartMixins],

  render: function() {
    var font_size = 12;
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
    
    /* create labels */
    var labels = [];

    _.each(scales, function(scale, index){
      var rotation = (360/scales.length) * (index);
          rotation -= 90; // start at top of chart
      
      var end_point = this.rotate_point(max_x, min_x,  min_x, min_x, rotation);
      
      
      if(end_point.x === min_x) end_point.x -= 5;
      else if(end_point.x < min_x) end_point.x -= 10;

      if(Math.round(end_point.y) === min_x) end_point.y -= 5;
      else if(Math.round(end_point.y) < min_x) end_point.y -= 10;

      //else if(end_point.x > min_x) end_point.x = 10;

      labels.push(
        <div 
          
          key={index} 
          className="chart-label"
          onClick={scale.label.onClick}
          style={{
            textAlign: "center",
            cursor: (scale.label.onClick ? 'pointer' : 'default'),
            position: 'absolute',
            left: end_point.x + "%",
            top: end_point.y + "%",
            width: "10%",
            fontSize: font_size
          }}>
         {scale.label.value}
        </div> );
    },this);

    return (
      <div style={{paddingRight:"100%", height: "100%", position: "absolute", top:"0px", left: "0px"}}>
        {labels}
      </div>
    );
  }

});

module.exports = SVGRadarLabels;