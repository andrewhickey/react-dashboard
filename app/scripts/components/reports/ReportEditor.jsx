import React from 'react';
import {branch} from '../baobab/higher-order';

import JsonEditor from "./query_editors/JsonEditor.jsx";
import RawEditor from "./query_editors/RawEditor.jsx";

import ReportActions from "../../actions/ReportActions";
import UIActions from "../../actions/UiActions";

var ReportEditor = React.createClass({
  fetchStatements(e) {
    if(e) e.preventDefault();
    ReportActions.fetchStatementsForReport(this.getParams().reportId);
  },
  setEditMode(e) {
    if(e) e.preventDefault();
    UIActions.setReportEditingMode(e.target.value);
  },
  getEditPanel(editingMode, reportCursor) {
    switch(editingMode) {
      case 0: return (
        <div>
          <h4>RAW editor</h4>
          <RawEditor cursor={reportCursor.select("query")} />
        </div>
      );
      case 1: return (
        <div>
          <h4>JSON editor</h4>
          <JsonEditor cursor={reportCursor.select("query")} />
        </div>
      );
      case 2: return (
        <div>
          <h4>WIZARD editor</h4>
          <JsonEditor cursor={reportCursor.select("query")} />
        </div>
      );
    }
  },

  render() {
    const { ui, report } = this.props;
    const reportId = parseInt(this.getParams().reportId);
    const reportCursor = reports.select(reportId);
    const report = reportCursor.get();
    
    const editingMode = parseInt(ui.get().editing_mode);
    const editPanel = this.getEditPanel(editingMode, reportCursor);
    
    const statements = _.map(report.statements, function(statement){
      return <li key={statement._id.$id}>statement</li>;
    });

    return (
      <div>
        <h3>Editing: {report.name}</h3>
        <input id="report-editmode-slider" type="range" min="0" max="2" value={editingMode} onChange={this.setEditMode} />
        {editPanel}
        <pre>{JSON.stringify(report.query,null,2)}</pre>
        <button onClick={this.fetchStatements}>Preview</button>
        <ul>
          {statements}
        </ul>
      </div>
    );
  }
});

module.exports = branch(ReportEditor, {
  cursors: {
    reports: ["reports"],
    ui: ["ui","reports"]
  }
});