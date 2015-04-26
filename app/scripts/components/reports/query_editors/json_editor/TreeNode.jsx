import "./jsonEditor.scss";
import React, { Component, PropTypes } from 'react';
import _ from "lodash";

import BooleanNode from './BooleanNode.jsx';
import ObjectNode from './ObjectNode.jsx';
import StringNode from './StringNode.jsx';
import NumberNode from './NumberNode.jsx';
import ArrayNode from './ArrayNode.jsx';
import NullNode from './NullNode.jsx';

export default class TreeNode extends Component {

  render() {
    const { currentObject, onChange } = this.props;
    const type = Object.prototype.toString.call(currentObject);

    switch( type ) {
      case "[object Boolean]":  return <BooleanNode currentObject={currentObject} onChange={onChange} />;
      case "[object Number]":   return <NumberNode currentObject={currentObject} onChange={onChange} />;
      case "[object String]":   return <StringNode currentObject={currentObject} onChange={onChange} />;
      case "[object Object]":   return <ObjectNode currentObject={currentObject} onChange={onChange} />;
      case "[object Array]":    return <ArrayNode currentObject={currentObject} onChange={onChange} />;
      default:                  return <NullNode currentObject={currentObject} onChange={onChange} />;
    }
  }

}

TreeNode.propTypes = {
  currentObject: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}