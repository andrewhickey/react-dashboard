import React from 'react';
import _ from "lodash";
import Attribute from "./Attribute.jsx";

const JsonEditor = React.createClass({
  logChange: function(attribute) {
    console.log(attribute);
  },
  render() {
    const cursor = this.props.cursor;
    const attribute = _.cloneDeep(cursor.get()) 

    return (
      <div>
        <pre>{JSON.stringify(cursor.get())}</pre>
        <div><Attribute attribute={attribute} onSave={this.logChange}/></div>
      </div>
    );
  }
});

module.exports = JsonEditor;