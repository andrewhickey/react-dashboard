import React from 'react';
import { DragDropMixin } from 'react-dnd';
import { DRAGGABLE_TYPES } from '../constants';

var WidgetContainer = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(DRAGGABLE_TYPES.WIDGET, {
        dropTarget: {
          acceptDrop( component, widget ) {
            console.log('You dropped ' + widget.name + '!');
          }
        }
      });
    }
  },
  
  render() {
    return (
      <div {...this.dropTargetFor(DRAGGABLE_TYPES.WIDGET)}
        className="widgetcontainer">
        Show widgets in the user's workspace
      </div>
    );
  }

});

module.exports = WidgetContainer;