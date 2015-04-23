import _ from "lodash";
import React from 'react';

import UiActions from "../actions/UiActions";
import ReportEditor from "../components/reports/ReportEditor.jsx";
import {branch} from '../components/baobab/higher-order';


var Reports = React.createClass({

  selectReport(reportId, e) {
    UiActions.setActiveReport(reportId);
  },

  render() {

    const reportList = _.map(this.props.reports, function(report, key) {
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

module.exports = branch(Reports, {
  cursors: {
    reports: ['reports'],
    ui: ["ui", "reports"]
  }
});