var _ = require('lodash');
var React = require('react/addons');
var d3 = require('d3');
var ReactTransitionGroup = React.addons.TransitionGroup;

var SVGRadarAxes  = require('./SVGRadarAxes.jsx');
var SVGRadarArea = require('./SVGRadarArea.jsx');
var SVGRadarLegend = require('./SVGRadarLegend.jsx');
var SVGRadarLabels = require('./SVGRadarLabels.jsx');

var SVGRadarChart = React.createClass({
  render: function() {
    var width = this.props.width || "100%";
    var height = this.props.height || "100%";
    var data = this.props.data;
    var offset = this.props.offset || 0;
    var hide_legend = this.props.hideLegend || false;

    /** PARSE DATA **/
    var axes   = [];
    try { 
      axes = data.labels;
    } catch(e){}

    var values = [];
    try { 
      values = _.chain(data.datasets)
                .pluck('data')
                .flatten()
                .value();
    } catch(e) {}

    var max = this.props.max || _.max(values) || 10;
    var min = this.props.min || 0;

    /** CREATE GRAPH OBJECTS **/
    // start scales at center of graph going to edge
    var scales = _.map(axes, function(axis){
      var scale = d3.scale.linear().domain([min, max+offset]).range([50, 90]);
          scale.label = axis;
      return scale;
    });
    // if no axes were provided create at least one scale so an empty graph can be rendered
    if(scales.length === 0) {
      var scale = d3.scale.linear().domain([min, max+offset]).range([50, 90]);
      scale.label = "";
      scales.push(scale)
    }

    var areas = null;
    try {
      areas = _.map(data.datasets, function(dataset, index){
        return <SVGRadarArea offset={offset} scales={scales} dataset={dataset} key={index} />;
      });
    } catch(e){}

    return (
      <div style={{width: width, height: height, position: "relative"}} className={"radar-chart " + this.props.className}>
        <svg ref="svg_element" width="100%" paddingBottom="100%" viewBox="0, 0, 100, 100">
          <g ref="chart_group">
            <circle className="chart-background" cx="50" cy="50" r="40" fill="rgba(41,  46,   51,   1)" />
            <SVGRadarAxes offset={offset} scales={scales}/>
            <ReactTransitionGroup component="g">{areas}</ReactTransitionGroup>
            {hide_legend ? null : <SVGRadarLegend offset={offset} scales={scales}/>}
          </g>
        </svg>
        <SVGRadarLabels offset={offset} scales={scales} />
      </div>
    );
  },

  componentDidMount: function() {
    this._centerViewBox();
  },
  componentDidUpdate: function() {
    this._centerViewBox();
  },

  _centerViewBox: function() {
    // use SVG viewBox to center the view on the content
    // allows for variable string lengths of labels
    /*var node = this.refs.chart_group.getDOMNode();
    var bb = node.getBBox();
    var svg = this.refs.svg_element.getDOMNode();
        svg.setAttribute("viewBox", bb.x+" "+bb.y+" "+bb.width+" "+bb.height);*/
  }

});

module.exports = SVGRadarChart;