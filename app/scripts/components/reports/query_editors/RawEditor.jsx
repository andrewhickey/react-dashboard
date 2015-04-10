// TODO remove has_changes attribute, use immutable data to check

import React from 'react';
import _ from "lodash";
import Attribute from "../../json_editor/Attribute.jsx";
import ReportActions from "../../../actions/ReportActions";

const JsonEditor = React.createClass({
  getInitialState() {
    return {
      has_changes: false,
      attribute: JSON.stringify(this.props.cursor.get(), null, 2)
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      attribute: JSON.stringify(nextProps.cursor.get(), null, 2),
      has_changes: false
    });
  },
  onQueryChange(e) {
    if(e) e.preventDefault();

    this.setState({
      attribute: e.target.value,
      has_changes: true
    });
  },
  saveChanges(e) {
    if(e) e.preventDefault();
    try {
      var json = JSON.parse(this.state.attribute);
      this.setState({has_changes: false});
      ReportActions.updateReport(this.props.cursor, json)
    } catch(e){
      console.log(e);
    }
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
        <textarea
          style={{"width":"100%", "height":"350px"}}
          value={this.state.attribute} 
          onChange={this.onQueryChange}
        />
        {save_form}
      </div>
    );
  }
});

module.exports = JsonEditor;