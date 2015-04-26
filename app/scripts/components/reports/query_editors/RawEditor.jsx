import React, { Component } from 'react';
import _ from "lodash";
import ReportActions from "../../../actions/ReportActions";

export default class RawEditor extends Component {
  saveChanges(e) {
    if(e) e.preventDefault();
    const nextQuery = JSON.parse(e.target.value);
    ReportActions.updateReportQuery(this.props.report.id, nextQuery);
  }

  render() {
    var stringQuery = JSON.stringify(this.props.report.query, null, 2);
    return (
      <div>
        <textarea
          style={{"width":"100%", "height":"350px"}}
          value={stringQuery} 
          onChange={this.saveChanges}
        />
      </div>
    );
  }
}