import React from 'react/addons';
import _ from "lodash";

var AddAttributeForm = React.createClass({
	handleSubmit: function() {

	},

	render() {
		return (
			<form onSumbit={this.handleSubmit}>
			  <select>
			    <option href="#">String</option>
			    <option href="#">Boolean</option>
			    <option href="#">Number</option>
			    <option href="#">Object</option>
			    <option href="#">Array</option>
			  </select>
			  <input type="text" placeholder="Enter value" />
			  <button>Add</button>
			</form>
		);
	}
});

module.exports = AddAttributeForm;