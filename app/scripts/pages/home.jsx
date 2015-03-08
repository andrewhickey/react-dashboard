import React from "react";
import Dashboard from "../components/Dashboard.jsx";
import stateTree from "../stateTree.js";

var Home = React.createClass({
	mixins: [stateTree.mixin],

	cursors: {
	  dashboards: ['dashboards']
	},

  render() {
  	var dashboard = this.state.cursors.dashboards[1];

    return (
      <Dashboard dashboard={dashboard} />
    );
  }

});

module.exports = Home;