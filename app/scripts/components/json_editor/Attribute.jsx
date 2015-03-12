import React from 'react/addons';
import _ from "lodash";

var Attribute = React.createClass({
  
  getInitialState() {
    return {
      is_editing: false,
      attribute: this.props.attribute
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      attribute: nextProps.attribute
    });
  },

  render() {
    return this.renderAttribute(this.state.attribute);
  }, 
  
  handleSubmit(e) {
    e.preventDefault();
    this.toggleEditing();
  },

  handleChange(e) {
    e.preventDefault();
    this.props.onBubble(e.target.value);
  },

  handleToggle(e) {
    this.props.onBubble(!this.state.attribute);
  },

  toggleEditing() {
    this.setState({is_editing: !this.state.is_editing});
  },

  handleBubblingChange(index, attribute) {
    var changeObj = {};
    changeObj[index] = attribute;
    var newState = React.addons.update(this.state.attribute, {
      $merge: changeObj
    });
    
    if(this.props.onBubble) {
      this.props.onBubble(newState);
    } else {
      this.setState({attribute: newState});
      if ( this.props.onChange ) this.props.onChange(newState);
      else console.warn('Pass an onChange function as a prop to the top level component');
    }

  },

  renderAttribute: function(object) {
    var type = Object.prototype.toString.call(object);

    switch( type ) {
      case "[object Boolean]":
        if (this.state.is_editing) {
          return <form className={"attribute-form"} onSubmit={this.handleSubmit}><input type="checkbox" checked={object} onChange={this.handleToggle} /></form>
        } else {
          return <span onDoubleClick={this.toggleEditing}>{object.toString()}</span>;
        }
      case "[object Number]":
        if (this.state.is_editing) {
          return <form className={"attribute-form"} onSubmit={this.handleSubmit}><input type="number" value={object} onChange={this.handleChange} /></form>
        } else {
          return <span onDoubleClick={this.toggleEditing}>{object.toString()}</span>;
        }
      case "[object String]":
        if (this.state.is_editing) {
          return <form className={"attribute-form"} onSubmit={this.handleSubmit}><input type="text" value={object} onChange={this.handleChange} /></form>
        } else {
          return <span onDoubleClick={this.toggleEditing}>{object.toString()}</span>;
        }
        break;
      
      case "[object Object]":
        return  <span>
                  {"{"}<ul>
                    {this.renderChildren(object)}
                  </ul>{"}"}
                </span>;
        break;

      case "[object Array]":
        return  <span>
                  [<ul>
                    {this.renderChildren(object)}
                  </ul>]
                </span>;
        break;
      default:
        return <span>null</span>;
        break;
    }
    return 
  },

  renderChildren: function(object) {
    return  _.map(object, function(sub_attribute, index){
      return <li  key={index}>{index}: <Attribute attribute={sub_attribute} onBubble={this.handleBubblingChange.bind(this, index)}/></li>;
    },this);
  }
});

module.exports = Attribute;