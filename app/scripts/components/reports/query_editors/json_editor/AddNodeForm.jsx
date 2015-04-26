import React, { Component, PropTypes } from 'react';
import _ from "lodash";

const attrTypes = {
  STRING: 0,
  BOOLEAN: 1,
  NUMBER: 2,
  OBJECT: 3,
  ARRAY: 4
};

export default class AddNodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attrType: attrTypes.STRING,
      keyValue: ""
    };
  }  

	_handleSubmit = (e) => {
    if(e) e.preventDefault();
    const { keyValue, attrType } = this.state;
		
    let newAttr = null;
    switch(attrType) {
			case attrTypes.STRING:
				newAttr = "";
				break;
			case attrTypes.BOOLEAN:
				newAttr = true;
				break;
			case attrTypes.NUMBER:
				newAttr = 0;
				break;
			case attrTypes.OBJECT:
				newAttr = {};
				break;
			case attrTypes.ARRAY:
				newAttr = [];
				break;
		}
		
		this.props.onSubmit( keyValue, newAttr );
	}

  _onChangeAttrType = (e) => {
    if(e) e.preventDefault();
    this.setState({attrType: parseInt(e.target.value)});
  }

  _onChangeKey = (e) => {
    if(e) e.preventDefault();
    this.setState({keyValue: e.target.value});
  }

	render() {
    const { needsKey } = this.props;		

    const key_input = needsKey ? (
      <input 
        type="text" 
        autoFocus 
        placeholder="Enter key" 
        value={this.state.keyValue} 
        onChange={this._onChangeKey} />
    ) : null;

		return (
			<form onSubmit={this._handleSubmit} >
			  {key_input}
			  <select ref="attr_input" onChange={this._onChangeAttrType} value={this.state.attrType}>
			    <option value={attrTypes.STRING} >String</option>
			    <option value={attrTypes.BOOLEAN} >Boolean</option>
			    <option value={attrTypes.NUMBER} >Number</option>
			    <option value={attrTypes.OBJECT} >Object</option>
			    <option value={attrTypes.ARRAY} >Array</option>
			  </select>
			  <button>Add</button>
			</form>
		);
	}
}

AddNodeForm.propTypes = {
  needsKey: PropTypes.bool,
  onSubmit: PropTypes.func
}