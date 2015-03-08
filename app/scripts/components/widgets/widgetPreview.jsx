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

    return (
      <div {...this.dragSourceFor(DRAGGABLE_TYPES.WIDGET)}
        className="widgetpreview"
        style={{"opacity": opacity}}
      >
        {this.props.widget.type}
      </div>
    );
  }

});

module.exports = WidgetPreview;