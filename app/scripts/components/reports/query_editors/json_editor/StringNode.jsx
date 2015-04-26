import React, { Component, PropTypes } from 'react';

export default class StringNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      tempString: props.currentObject
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      tempString: nextProps.currentObject
    });
  }

  _onChange = (e) => {
    if(e) e.preventDefault();
    this.setState({tempString: e.target.value});
  }

  _onSave = (e) => {
    this.props.onChange(this.state.tempString);
    this.setState({isEditing: false});
  }

  _toggleEditing = (e) => {
    if(e) e.preventDefault();
    this.setState({isEditing: !this.state.isEditing}); 
  }

  render() {
    const { currentObject } = this.props;
    const { isEditing, tempString } = this.state;
    return this.state.isEditing ? (
        <form className={"json-string-editor"} onSubmit={this._onSave}>
          <input onBlur={this._onSave} autoFocus type="text" value={tempString} onChange={this._onChange} />
        </form>
      ) : (
        <span className="json-string-editor" onDoubleClick={this._toggleEditing}>
          {currentObject}
        </span>
      );
  }
}

StringNode.propTypes = {
  currentObject: PropTypes.string.isRequired
};