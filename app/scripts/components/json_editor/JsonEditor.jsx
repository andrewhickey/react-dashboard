import React from 'react';
import _ from "lodash";
import Attribute from "./Attribute.jsx";
import ReportActions from "../../actions/ReportActions";

const JsonEditor = React.createClass({
  getInitialState() {
    return {
      has_changes: false,
      attribute: _.cloneDeep(this.props.cursor.get())
    }
  },
  logChange(attribute) {
    this.setState({
      attribute: attribute,
      has_changes: true
    });
  },
  saveChanges(e) {
    if(e) e.preventDefault();
    this.setState({has_changes: false});
    ReportActions.updateReport(this.props.cursor, this.state.attribute)
  },
  cancelChanges(e) {
    if(e) e.preventDefault();
    this.setState(this.getInitialState());
  },
  render() {
    let save_form;
    if( this.state.has_changes ) save_form = (
      <form>
        <button onClick={this.saveChanges}>Save changes</button>
        <button onClick={this.cancelChanges}>Cancel changes</button>
      </form>
    );
    return (
      <div>
        <pre>{JSON.stringify(this.props.cursor.get())}</pre>
        <div><Attribute attribute={this.state.attribute} onChange={this.logChange} /></div>
        {save_form}
      </div>
    );
  }
});

module.exports = JsonEditor;