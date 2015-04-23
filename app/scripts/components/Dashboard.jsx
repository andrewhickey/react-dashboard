import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { configureDragDrop } from 'react-dnd';
import { DRAGGABLE_TYPES } from '../constants';
import WidgetActions from '../actions/WidgetActions';
import Widget from "./widgets/Widget.jsx";

const widgetPreviewTarget = {
  drop(props, monitor) {
    const {widget} = monitor.getItem();
    console.log('You dropped ' + widget.type + '!')
    WidgetActions.addWidgetToDashboard(props.dashboard, widget);
  }
}

@configureDragDrop(
  register =>
    register.dropTarget(DRAGGABLE_TYPES.WIDGET, widgetPreviewTarget),

  widgetPreviewTarget => ({
    connectDropTarget: widgetPreviewTarget.connect(),
    isOver: widgetPreviewTarget.isOver(),
    canDrop: widgetPreviewTarget.canDrop()
  })
)
export default class Dashboard extends Component {

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;

    return (
      <div 
        ref={connectDropTarget}
        className="dashboard">
        {_.map(this.props.dashboard.widgets, function(widget, index){
          return <Widget key={index} widget={widget} />;
        })}
      </div>
    );
  }

}