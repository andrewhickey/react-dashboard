import React, { Component, PropTypes, addons } from 'react';
import AddNodeForm from './AddNodeForm.jsx';
import TreeNode from './TreeNode.jsx';
import _ from 'lodash';
import classNames from 'classnames';


export default class ArrayNode extends Component {
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
    let updatedArray =  this.props.currentObject.slice(0);
    updatedArray.slice(index,1);
    this.props.onChange( updatedArray );
  }

  _handleAttrChange = (index, newValue, e) => {
    if(e) e.preventDefault();
    const currValue = this.props.currentObject[index];
    if( currValue !== newValue) {
      let updatedArray = this.props.currentObject.slice(0);
      updatedArray[index] = newValue;
      this.props.onChange( updatedArray );
    }
  }

  _addAttribute = (index, newValue, e) => {
    let updatedArray = this.props.currentObject.slice(0);
    updatedArray.push( newValue );
    this.props.onChange( updatedArray );
    this.setState({isAdding: false});
  }

  _renderChildren = () => {
    return  _.map(this.props.currentObject, function(childObject, index){
      return (
        <li key={index}>
          <button className="json-editor-remove" onClick={this._destroyAttribute.bind(this, index)}>
            <i className="fa fa-times"></i>     
          </button> 
          <TreeNode 
            currentObject={childObject} 
            onChange={this._handleAttrChange.bind(this, index)} />
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
        <AddNodeForm needsKey={false} onSubmit={this._addAttribute} />
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
      "json-array-editor": true,
      "json-editor-expanded": isExpanded
    });

    const toggleClasses = classNames({
      "json-editor-toggle": true,
      "json-editor-expanded": isExpanded
    });

    return (
      <span className={editorClasses}> 
        [<button onClick={this._toggleExpanded} className={toggleClasses}><i className="fa fa-chevron-right" /></button>
          <CSSTransitionGroup transitionName="json-editor-expand">
            {listSection}
          </CSSTransitionGroup> 
        ]
      </span>
    );
  }
}
ArrayNode.propTypes = {
  currentObject: PropTypes.array.isRequired
};