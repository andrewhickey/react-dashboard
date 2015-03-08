import React from 'react';
import _ from "lodash";
import JsonEditorMixin from "./JsonEditorMixin.jsx";

const Attribute = React.createClass({
  mixins: [JsonEditorMixin],
  render() {
    const attribute = this.props.attribute;

    const attributes = _.map(attribute, function(attribute, index){
      return this.createNodeFromAttribute(attribute, index);
    },this);


    return (
      <div>ATTR HERE</div>
    );
  }
});

module.exports = Attribute;