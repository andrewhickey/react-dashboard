import _ from "lodash";
import stateTree from "../stateTree";
import React from 'react';
import { RouteHandler, Link } from 'react-router';

import UiActions from "../actions/UiActions";
import ReportEditor from "../components/reports/ReportEditor.jsx";

var Info = React.createClass({
  mixins: [stateTree.mixin],

  cursors: {
    reports: ['reports'],
    ui: ["ui", "reports"]
  },

  selectReport(reportId, e) {
    UiActions.setActiveReport(reportId);
  },

  render() {

    const reportList = _.map(this.state.cursors.reports, function(report, key) {
      return <li key={key} onClick={this.selectReport}><Link to="reports.id" params={{reportId: report.id}}>{report.name}</Link></li>;
    }.bind(this));

    return (
      <div>
        <ul>
          {reportList}
        </ul>
        <RouteHandler />
      </div>
    );
  }

});

module.exports = Info;