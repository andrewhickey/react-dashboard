import React from 'react';
import _ from "lodash";

var Attribute = React.createClass({
  
  render() {
    const attribute = this.props.attribute;


    return (
      <div>
        {this.renderAttribute(attribute)}
      </div>
    );
  }, 

  renderAttribute: function(object) {
    var type = Object.prototype.toString.call(object);
    switch( type ) {
      case "[object Boolean]":
      case "[object Number]":
      case "[object String]":
        return <div>{type}{object}</div>;
        break;
      case "[object Object]":
        return  <div>
                  {type}
                  {this.renderChildren(object)}
                </div>;
        break;
      case "[object Array]":
        return  <div>
                  {type}
                  {this.renderChildren(object)}
                </div>;
        break;
      default:
        console.log('no match', type);
        break;
    }
    return 
  },

  renderChildren: function(object) {
    return  _.map(object, function(sub_attribute, index){
      console.log(sub_attribute);
      return <Attribute attribute={sub_attribute} key={index} />;
    },this);
  }
});

module.exports = Attribute;