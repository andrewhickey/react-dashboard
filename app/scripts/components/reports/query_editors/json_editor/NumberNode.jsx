import React, { Component, PropTypes } from 'react';

export default class NumberNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      tempNumber: props.currentObject
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ tempNumber: nextProps.currentObject });
  }

  _onChange = (e) => {
    if(e) e.preventDefault();
    this.setState({tempNumber: e.target.value});
  }

  _onSave = (e) => {

  }

  _toggleEditing = (e) => {
    if(e) e.preventDefault();
    this.setState({isEditing: !this.state.isEditing}); 
  }

  render() {
    const { currentObject } = this.props;
    const { isEditing, tempNumber } = this.state;
    return this.state.isEditing ? (
        <form className={"json-number-editor"} onSubmit={this._onSave}>
          <input onBlur={this._onSave} autoFocus type="number" value={tempNumber} onChange={this._onChange} />
        </form>
      ) : (
        <span className="json-number-editor" onDoubleClick={this._toggleEditing}>
          {currentObject}
        </span>
      );
  }
}

NumberNode.propTypes = {
  currentObject: PropTypes.number.isRequired
};