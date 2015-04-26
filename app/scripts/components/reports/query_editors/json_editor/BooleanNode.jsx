import React, { Component, PropTypes } from 'react';

export default class BooleanNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      tempBoolean: props.currentObject
    }
  }

  

  componentWillReceiveProps = (nextProps) => {
    this.setState({ tempBoolean: nextProps.currentObject });
  }

  _onChange = (e) => {
    if(e) e.preventDefault();
    this.setState({tempBoolean: e.target.value});
  }

  _onSave = (e) => {

  }

  _toggleEditing = (e) => {
    if(e) e.preventDefault();
    this.setState({isEditing: !this.state.isEditing}); 
  }

  render() {
    const { currentObject } = this.props;
    const { isEditing, tempBoolean } = this.state;
    return this.state.isEditing ? (
        <form className={"json-boolean-editor"} onSubmit={this._onSave}>
          <input onBlur={this._onSave} autoFocus type="checkbox" checked={tempBoolean} onChange={this._onChange} />
        </form>
      ) : (
        <span className="json-boolean-editor" onDoubleClick={this._toggleEditing}>
          {currentObject.toString}
        </span>
      );
  }
}

BooleanNode.propTypes = {
  currentObject: PropTypes.bool.isRequired
};