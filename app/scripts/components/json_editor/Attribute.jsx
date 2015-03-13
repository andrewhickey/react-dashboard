import React from 'react/addons';
import _ from "lodash";

// TODO bubble changes only on end of edit

var Attribute = React.createClass({
  
  getInitialState() {
    return {
      is_editing: false,
      is_editing_keys: {},
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

  handleKeyChange(old_key, e) {
    e.preventDefault();
    var newAttribute = React.addons.update(this.state.attribute, {});
    newAttribute[ e.target.value ] = newAttribute[ old_key ];
    delete newAttribute[ old_key ];
    this.bubbleChange(newAttribute);
  },

  handleToggle(e) {
    this.props.onBubble(!this.state.attribute);
  },

  toggleEditing(e) {
    if(e) e.preventDefault();
    this.setState({is_editing: !this.state.is_editing});
  },

  toggleEditingForKey(key, e) {
    if(e) e.preventDefault();
    var stateobj = {is_editing_keys: {}};
    stateobj.is_editing_keys[key] = !this.state.is_editing_keys[key];
    this.setState(stateobj);
  },

  addAttribute(new_attr, e) {
    if(e) e.preventDefault();
    var newAttribute = React.addons.update(this.state.attribute, {});
    var type = Object.prototype.toString.call(this.state.attribute );
    if (type === "[object Object]"){
      newAttribute["newkey"] = new_attr;
    } else {
      newAttribute.push(new_attr);
    }
    this.setState({is_editing: false});
    this.bubbleChange(newAttribute);
  },

  destroyAttribute(index, e) {
    e.preventDefault();
    var newAttribute = React.addons.update(this.state.attribute, {});
    var type = Object.prototype.toString.call(this.state.attribute );
    
    if (type === "[object Object]"){
      delete newAttribute[index];
    } else {
      newAttribute.splice(index,1);
    }

    this.bubbleChange(newAttribute);
  },

  bubbleChange(newState) {
    if(this.props.onBubble) {
      this.props.onBubble(newState);
    } else {
      this.setState({attribute: newState});
      if ( this.props.onChange ) this.props.onChange(newState);
      else console.warn('Warning: Pass an onChange function as a prop to the top level component');
    }
  },

  handleBubblingChange(index, attribute) {
    var changeObj = {};
    changeObj[index] = attribute;
    var newState = React.addons.update(this.state.attribute, {
      $merge: changeObj
    });
    this.bubbleChange(newState);
  },

  renderAttribute: function(object) {
    var type = Object.prototype.toString.call(object);

    switch( type ) {
      case "[object Boolean]":
        if (this.state.is_editing) {
          return <form className={"attribute-form"} onSubmit={this.handleSubmit}><input type="checkbox" checked={object} onChange={this.handleToggle} /></form>;
        } else {
          return <span onDoubleClick={this.toggleEditing}>{object.toString()}</span>;
        }
      case "[object Number]":
        if (this.state.is_editing) {
          return <form className={"attribute-form"} onSubmit={this.handleSubmit}><input type="number" value={object} onChange={this.handleChange} /></form>;
        } else {
          return <span onDoubleClick={this.toggleEditing}>{object.toString()}</span>;
        }
      case "[object String]":
        if (this.state.is_editing) {
          return <form className={"attribute-form"} onSubmit={this.handleSubmit}><input type="text" value={object} onChange={this.handleChange} /></form>;
        } else {
          return <span onDoubleClick={this.toggleEditing}>{object.toString()}</span>;
        }
        break;
      
      case "[object Object]":
        return  <span> 
                  {"{"}{this.renderAddSection()}<ul>
                    {this.renderChildren(object)}
                  </ul>{"}"}
                </span>;
        break;

      case "[object Array]":
        return  <span> 
                  [{this.renderAddSection()}<ul>
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

  renderAddSection() {
    if (this.state.is_editing) {
      return (
        <span>
          <a href="#" onClick={this.toggleEditing}> - </a>
          <ul>
            <li><a href="#" onClick={this.addAttribute.bind(this, "")} >String</a></li>
            <li><a href="#" onClick={this.addAttribute.bind(this, true)} >Boolean</a></li>
            <li><a href="#" onClick={this.addAttribute.bind(this, 0)} >Number</a></li>
            <li><a href="#" onClick={this.addAttribute.bind(this, {})} >Object</a></li>
            <li><a href="#" onClick={this.addAttribute.bind(this, [])} >Array</a></li>
          </ul>
        </span>
      );
    } else {
      return <a href="#" onClick={this.toggleEditing}> + </a>
    }
  },

  renderChildren: function(object) {
    return  _.map(object, function(sub_attribute, index){
      return <li  key={index}>
              <a href="#" onClick={this.destroyAttribute.bind(this, index)}> X </a> 
              { this.renderKey(index) }
              <Attribute 
                attribute={sub_attribute} 
                onBubble={this.handleBubblingChange.bind(this, index)}/>
            </li>;
    },this);
  },

  renderKey: function(key) {
    // array keys can't be renamed
    var type = Object.prototype.toString.call(this.state.attribute );
    if (type === "[object Object]") {
      if( this.state.is_editing_keys[key] ) {
        console.log(key);
        return (
          <form className={"attribute-form"} onSubmit={this.toggleEditingForKey.bind(this,key)}>
            <input type="text" value={key} onChange={this.handleKeyChange.bind(this,key)} />
          </form>
        );
      } else {
        return <span onDoubleClick={this.toggleEditingForKey.bind(this, key)}>{key}: </span>;
      }
    } else {
      return <span>{key}: </span>;
    }
  }
});

module.exports = Attribute;