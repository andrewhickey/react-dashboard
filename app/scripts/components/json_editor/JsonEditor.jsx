import React from 'react';
import _ from "lodash";
import JsonEditorMixin from "./JsonEditorMixin.jsx";

const JsonEditor = React.createClass({
  mixins: [JsonEditorMixin],
  render() {
    const cursor = this.props.cursor;

    const attributes = _.map(cursor.get(), function(attribute, index){
      return this.createNodeFromAttribute(attribute, index);
    },this);

    return (
      <div>
        <pre>{JSON.stringify(cursor.get())}</pre>
        <div>{attributes}</div>
      </div>
    );
  }
});

module.exports = JsonEditor;