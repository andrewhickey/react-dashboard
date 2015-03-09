import React from 'react';
import _ from "lodash";
import Attribute from "./Attribute.jsx";

const JsonEditor = React.createClass({
  render() {
    const cursor = this.props.cursor;
    const attribute = _.cloneDeep(cursor.get()) 
    
    return (
      <div>
        <pre>{JSON.stringify(cursor.get())}</pre>
        <div><Attribute attribute={attribute} /></div>
      </div>
    );
  }
});

module.exports = JsonEditor;