import stateTree from "../../stateTree";
import React from 'react';
import { State } from 'react-router';

import JsonEditor from "../json_editor/JsonEditor.jsx";
import ReportActions from "../../actions/ReportActions";

var Info = React.createClass({
  mixins: [stateTree.mixin, State],
  cursors: {
    reports: ['reports']
  },
  fetchStatements(e) {
    if(e) e.preventDefault();
    ReportActions.fetchStatementsForReport(this.getParams().reportId);
  },

  render() {
    const reportId = parseInt(this.getParams().reportId);
    const reportCursor = this.cursors.reports.select(reportId);
    const report = reportCursor.get();

    const statements = _.map(report.statements, function(statement){
      return <li key={statement._id.$id}>statement</li>;
    });

    return (
      <div>
        <h3>Editing: {report.name}</h3>
        <JsonEditor cursor={reportCursor.select("query")} />
        <button onClick={this.fetchStatements}>Preview</button>
        <ul>
          {statements}
        </ul>
      </div>
    );
  }
});

module.exports = Info;