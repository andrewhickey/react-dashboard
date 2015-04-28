import React, {Component} from 'react';
import {branch} from '../baobab/higher-order';
import PropTypes from '../baobab/utils/prop-types';

import JsonEditor from "./query_editors/JsonEditor.jsx";
import RawEditor from "./query_editors/RawEditor.jsx";

import ReportActions from "../../actions/ReportActions";
import UIActions from "../../actions/UiActions";

class ReportEditor extends Component {

  fetchStatements(reportId, e) {
    if(e) e.preventDefault();
    ReportActions.fetchStatementsForReport(reportId);
  }

  setEditMode(e) {
    if(e) e.preventDefault();
    UIActions.setReportEditingMode(e.target.value);
  }

  undoChanges(reportId,e) {
    if(e) e.preventDefault();
    ReportActions.undoReportQuery(reportId);
  }

  getEditPanel(editingMode, report) {
    editingMode = parseInt(editingMode);

    switch(editingMode) {
      case 0: return (
        <div>
          <h4>RAW editor</h4>
          <RawEditor report={report} />
        </div>
      );
      case 1: return (
        <div>
          <h4>JSON editor</h4>
          <JsonEditor report={report} />
        </div>
      );
      case 2: return (
        <div>
          <h4>WIZARD editor</h4>
          <JsonEditor report={report} />
        </div>
      );
    }
  }

  render() {
    const { ui, report } = this.props;
    const undoForm = report.canUndoQueryChanges ? (
      <form>
        <button onClick={this.undoChanges.bind(this,report.id)}>Undo</button>
      </form>
    ) : null;

    const editPanel = this.getEditPanel(ui.editing_mode, report);
    
    const statements = _.map(report.statements, function(statement){
      return <li key={statement._id.$id}>statement</li>;
    });
    
    return (
      <div>
        <h3>Editing: {report.name}</h3>
        <input id="report-editmode-slider" type="range" min="0" max="2" value={ui.editing_mode} onChange={this.setEditMode} />
        {editPanel}
        {undoForm}
        <h3>Preview</h3>
        <pre>{JSON.stringify(report.query,null,2)}</pre>
        <button onClick={this.fetchStatements.bind(this,report.id)}>Preview</button>
        <ul>
          {statements}
        </ul>
      </div>
    );
  }
}

module.exports = branch(ReportEditor, {
  cursors: {
    ui: ["ui", "pages", "reports"]
  }
});