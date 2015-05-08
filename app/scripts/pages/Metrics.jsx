import _ from "lodash";
import React, {Component} from 'react';

import UiActions from "../actions/UiActions";
import ReportEditor from "../components/reports/ReportEditor.jsx";
import {branch} from 'baobab-react/higher-order';

class Metrics extends Component {

  selectReport(metricId, e) {
    UiActions.setActiveMetric(metricId);
  }

  render() {
    const {metrics, currentMetric} = this.props;

    const metricList = _.map(metrics, function(metric, key) {
      return (
        <li key={key} >
          <a href="#" onClick={this.selectReport.bind(this,metric.id)}>
            {metric.name}
          </a>
        </li>
      );
    }.bind(this));

    return (
      <div className="page">
        <ul>
          {metricList}
        </ul>
      </div>
    );
  }

};

module.exports = branch(Metrics, {
  cursors: {
    metrics: ['metrics'],
  },
  facets: {
    currentMetric: "currentMetric"
  }
});