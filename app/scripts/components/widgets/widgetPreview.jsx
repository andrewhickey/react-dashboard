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
    return (
      <div {...this.dragSourceFor(DRAGGABLE_TYPES.WIDGET)}
        className="widgetpreview">
        {this.props.widget.name}
      </div>
    );
  }

});

module.exports = WidgetPreview;