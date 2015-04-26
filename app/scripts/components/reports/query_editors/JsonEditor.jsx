import React, {Component} from 'react';
import _ from "lodash";
import TreeNode from "./json_editor/TreeNode.jsx";
import ReportActions from "../../../actions/ReportActions";

export default class JsonEditor extends Component {
  
  saveChanges = (nextQuery, e) => {
    if(e) e.preventDefault();
    ReportActions.updateReportQuery(this.props.report.id, nextQuery);
  }

  render() {
    const { report } = this.props;

    return (
      <div>
        <div><TreeNode currentObject={report.query} onChange={this.saveChanges} /></div>
      </div>
    );
  }
};

