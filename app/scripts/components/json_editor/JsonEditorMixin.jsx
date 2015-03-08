import React from 'react';
import Attribute from "./Attribute.jsx";

module.exports = {
	createNodeFromAttribute(object, index) {
		console.log(index);
		var type = Object.prototype.toString.call(object);
		switch( type ) {
			case "[object Boolean]":
			case "[object Number]":
			case "[object String]":
				return <Attribute attribute={object} key={index}/>;
				break;
			case "[object Object]":
				return <Attribute attribute={object} key={index}/>;
				break;
			case "[object Array]":
				return <Attribute attribute={object} key={index}/>;
				break;
			default:
				console.log('no match', type);
				break;
		}
		
	}
};