import _ from "lodash";
import stateTree from "../stateTree";
import React from 'react';
import JsonEditor from "../components/json_editor/JsonEditor.jsx";
import { RouteHandler } from 'react-router';

var Info = React.createClass({
  mixins: [stateTree.mixin],

  cursors: {
    reports: ['reports']
  },

  render() {
    
    const report_list = _.map(this.state.cursors.reports, function(report, key) {
      return <li key={key}>{report.name}</li>;
    });

    return (
      <div>
        <ul>
          {report_list}
        </ul>
        <RouteHandler />
      </div>
    );
  }

});

module.exports = Info;