import React          from "react";
import Dashboard      from "../components/Dashboard.jsx";
import {root, branch} from 'baobab-react/higher-order';

var Home = React.createClass({

  render() {
    var dashboard = this.props.dashboards[1];

    return (
      <Dashboard dashboard={dashboard} />
    );
  }

});

module.exports = branch(Home, {
  cursors: {
    dashboards: ['dashboards']
  }
});