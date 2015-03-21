var _ = require('lodash');
var React = require('react');
var d3 = require('d3');

var ChartMixins = require('../ChartMixins');
var SVGRadarArea = React.createClass({
  mixins: [ChartMixins],
  getInitialState: function() { return {}; }, 
  componentWillEnter: function(callback) {
    //console.log('added area');
    callback();
  },
  componentDidEnter: function() {
    //console.log('adding area');
  },
  componentWillLeave: function(callback) {
    //console.log('removing area');
    callback();
  },
  componentDidLeave: function() {
    //console.log('removed area');
  },
  componentWillReceiveProps: function(nextProps) {
    var oldPoints = this.dataToPoints(this.props.dataset.data, this.props.scales, this.props.offset);
    this.setState({oldPath: this.pointsToPath(oldPoints)});    
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    var oldPath = this.pointsToPath(
      this.dataToPoints(this.props.dataset.data, this.props.scales, this.props.offset)
    );
    var newPath = this.pointsToPath(
      this.dataToPoints(nextProps.dataset.data, nextProps.scales, nextProps.offset)
    );
    return oldPath !== newPath ;
  },


  render: function() {
    var border_radius = 4;
    var dataset = this.props.dataset;
    var scales = this.props.scales;
    var stroke_width = dataset.strokeWidth || 0;
    var offset = this.props.offset || 0;

    var path;
        
    var animation = null;
    if( this.state.oldPath ) {
      oldPath = this.state.oldPath;
      path = oldPath;
    } else {
      var points = this.dataToPoints(dataset.data, scales, offset);
      path = this.pointsToPath(points);
    }

    return (
      <path 
        className="chart-area" 
        d={path} 
        fill={dataset.fill}
        stroke={dataset.stroke}
        strokeWidth={stroke_width}
        strokeDasharray={dataset.strokeDasharray} 
        />
    );
  },

  componentDidUpdate: function() {
    if( this.state.oldPath ) {
      var points = this.dataToPoints(this.props.dataset.data, this.props.scales, this.props.offset);
      var newPath = this.pointsToPath(points);
      var svgPath = d3.select(this.getDOMNode());
      svgPath.transition().duration(1500).attr("d", newPath);
    }
  },

  dataToPoints: function(data, scales, offset) {
    return _.reduce(data, function(memo, value, index){
      var scale = scales[index];
      var min_x = scale(scale.domain()[0]);
      var rotation = (360/scales.length) * (index);
          rotation -= 90; // start at top of chart

      var scaled_value = scale(value+offset);
      if ( value === 0 ) scaled_value = scale(0);
      var point = this.rotate_point(scaled_value, min_x, min_x, min_x, rotation);
      return memo + point.x + "," + point.y + " ";
    }, "", this);
  }

});

module.exports = SVGRadarArea;