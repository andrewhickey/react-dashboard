import React, { Component, PropTypes, addons } from 'react';
import AddNodeForm from './AddNodeForm.jsx';
import TreeNode from './TreeNode.jsx';
import StringNode from './StringNode.jsx';
import classNames from 'classnames';

import _ from 'lodash';

export default class ObjectNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true, // Should this component display its children?
      isAdding: false, // Is this component adding a new child?
    };
  }

  _toggleExpanded = (e) => {
    if(e) e.preventDefault();
    this.setState({isExpanded: !this.state.isExpanded});
  }

  _toggleAdding = (e) => {
    if(e) e.preventDefault();
    this.setState({isAdding: !this.state.isAdding});
  }

  _destroyAttribute = (index, e) => {
    if(e) e.preventDefault();
    let updatedObject =  Object.assign({}, this.props.currentObject);
    delete updatedObject[index];
    this.props.onChange( updatedObject );
  }

  _handleKeyChange = (key, newKey, e) => {
    if(e) e.preventDefault();
    if( newKey !== key ) {
      let updatedObject =  Object.assign({}, this.props.currentObject);
      // move child to the new key
      updatedObject[ newKey ] = updatedObject[ key ];
      delete updatedObject[ key ];
      this.props.onChange(updatedObject);
    }
  }

  _handleAttrChange = (index, newValue, e) => {
    if(e) e.preventDefault();
    const currValue = this.props.currentObject[index];
    if( currValue !== newValue) {
      let updatedObject =  Object.assign({}, this.props.currentObject);
      updatedObject[index] = newValue;
      this.props.onChange( updatedObject );
    }
  }

  _addAttribute = (index, newValue) => {
    this._handleAttrChange(index, newValue);
    if( index && !this.props.currentObject[index] ) {
      let updatedObject =  Object.assign({}, this.props.currentObject);
      updatedObject[index] = newValue;
      this.props.onChange( updatedObject );   
      this.setState({isAdding: false});
    }
  }

  _renderChildren = () => {
    return  _.map(this.props.currentObject, function(childObject, index){
      return (
        <li key={index}>
          <button className="json-editor-remove" onClick={this._destroyAttribute.bind(this, index)}>
            <i className="fa fa-times"></i>
          </button> 
          <div>
            <span className="json-editor-key">
              <StringNode 
                currentObject={index} 
                onChange={ this._handleKeyChange.bind(this, index) } />
            </span>
            <TreeNode 
              currentObject={childObject} 
              onChange={this._handleAttrChange.bind(this, index)} />
          </div>
        </li>
      );
    },this);
  }

  render() {
    const CSSTransitionGroup = addons.CSSTransitionGroup;
    const { isExpanded, isAdding, isEditingKeys } = this.state;
    const { currentObject } = this.props;
    const addSection = isAdding ? (
      <li>
        <button href="#" onClick={this._toggleAdding}>
          <i className="fa fa-minus"></i>
        </button>
        <AddNodeForm needsKey={true} onSubmit={this._addAttribute} />
      </li>
    ) : (
      <li>
        <button href="#" onClick={this._toggleAdding}>
          <i className="fa fa-plus"></i>
        </button>
      </li>
    );
    
    const listSection = isExpanded ? (
      <ul className="json-editor-list" key="list-section">
        {this._renderChildren()}
        {addSection}
      </ul>
    ) : null;

    const editorClasses = classNames({
      "json-object-editor": true,
      "json-editor-expanded": isExpanded
    });

    const toggleClasses = classNames({
      "json-editor-toggle": true,
      "json-editor-expanded": isExpanded
    });
    
    return (
      <span className={editorClasses}> 
        {"{"}<button onClick={this._toggleExpanded} className={toggleClasses}><i className="fa fa-chevron-right" /></button>
          <CSSTransitionGroup transitionName="json-editor-expand">
            {listSection}
          </CSSTransitionGroup>  
        {"}"}
      </span>
    );
  }

}
ObjectNode.propTypes = {
  currentObject: PropTypes.object.isRequired
};
