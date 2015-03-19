import React from 'react/addons';
import _ from "lodash";

var AddAttributeForm = React.createClass({

	handleSubmit(e) {
		e.preventDefault();
		let new_attr;
		switch(this.refs.attr_input.getDOMNode().value) {
			case "string":
				new_attr = "";
				break;
			case "bool":
				new_attr = true;
				break;
			case "num":
				new_attr = 0;
				break;
			case "obj":
				new_attr = {};
				break;
			case "arr":
				new_attr = [];
				break;
		}
		let new_key = this.refs.key_input.getDOMNode().value;
		this.props.onSubmit(new_attr, new_key);
	},

	render() {
		let key_input = null;
		let type = Object.prototype.toString.call(this.props.attribute);
		if( type === "[object Object]" )
			key_input = <input type="text" autoFocus placeholder="Enter key" ref="key_input" />;

		return (
			<form onSubmit={this.handleSubmit}>
			  {key_input}
			  <select ref="attr_input">
			    <option value="string" >String</option>
			    <option value="bool" >Boolean</option>
			    <option value="num" >Number</option>
			    <option value="obj" >Object</option>
			    <option value="arr" >Array</option>
			  </select>
			  <button>Add</button>
			</form>
		);
	}
});

module.exports = AddAttributeForm;