import _ from "lodash";
import React, {Component} from 'react';

import UiActions from "../actions/UiActions";
import ReportEditor from "../components/reports/ReportEditor.jsx";
import {branch} from 'baobab-react/higher-order';

class Reports extends  Component {

  selectReport(reportId, e) {
    UiActions.setActiveReport(reportId);
  }

  render() {
    const {reports, currentReport} = this.props;

    const reportList = _.map(reports, function(report, key) {
      return (
        <li key={key} >
          <a href="#" onClick={this.selectReport.bind(this,report.id)}>
            {report.name}
          </a>
        </li>
      );
    }.bind(this));

    return (
      <div className="page">
        <ul>
          {reportList}
        </ul>
        <ReportEditor report={currentReport} />
      </div>
    );
  }

};

module.exports = branch(Reports, {
  cursors: {
    reports: ['reports'],
  },
  facets: {
    currentReport: "currentReport"
  }
});