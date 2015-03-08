import _ from 'lodash';
import React from 'react';
import { DragDropMixin } from 'react-dnd';
import { DRAGGABLE_TYPES } from '../constants';
import WidgetActions from '../actions/WidgetActions';
import Widget from "./widgets/Widget.jsx";

var Dashboard = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(DRAGGABLE_TYPES.WIDGET, {
        dropTarget: {
          acceptDrop( component, widget ) {
            WidgetActions.addWidgetToDashboard(component.props.dashboard, widget)
            console.log('You dropped ' + widget.type + '!');
          }
        }
      });
    }
  },
  
  render() {
    return (
      <div {...this.dropTargetFor(DRAGGABLE_TYPES.WIDGET)}
        className="dashboard">
        {_.map(this.props.dashboard.widgets, function(widget, index){
          return <Widget key={index} widget={widget} />;
        })}
      </div>
    );
  }

});

module.exports = Dashboard;