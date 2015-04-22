import React from 'react';
import { DragDropMixin } from 'react-dnd';
import { DRAGGABLE_TYPES } from '../../constants';
import { PropTypes } from 'react';

var WidgetPreview = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    widget: PropTypes.object.isRequired
  },

  statics: {
    configureDragDrop(register) {
      register(DRAGGABLE_TYPES.WIDGET, {
        dragSource: {
          beginDrag(component) {
            return {
              item: component.props.widget
            }
          }
        }
      });
    }
  },

  render() {
    const { name } = this.props;
    const { isDragging } = this.getDragState(DRAGGABLE_TYPES.WIDGET);
    const opacity = isDragging ? 0.4 : 1;
    const icon = this.getIcon();

    return (
      <div {...this.dragSourceFor(DRAGGABLE_TYPES.WIDGET)}
        className="widgetpreview"
        style={{"opacity": opacity}}
      >
        {icon}
        <div>{this.props.widget.type}</div>
      </div>
    );
  },

  getIcon() {
    switch(this.props.widget.type) {
      case 'line':  return <i className={"fa fa-line-chart"}></i>;
      case 'area':  return <i className={"fa fa-area-chart"}></i>;
      case 'bar':   return <i className={"fa fa-bar-chart"}></i>;
      case 'pie':   return <i className={"fa fa-pie-chart"}></i>;
      case 'radar': return <i className={"fa fa-area-chart"}></i>;
    }
  }

});

module.exports = WidgetPreview;