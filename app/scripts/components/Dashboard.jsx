import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { configureDragDrop } from 'react-dnd';
import { DRAGGABLE_TYPES } from '../constants';
import WidgetActions from '../actions/WidgetActions';
import Widget from "./widgets/Widget.jsx";
import ReactGridLayout from 'react-grid-layout';


// TODO implement react grid https://github.com/STRML/react-grid-layout

const widgetPreviewTarget = {
  drop(props, monitor) {
    const {widget} = monitor.getItem();
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
    const layout = _.map(this.props.dashboard.widgets, function(widget, index){
      return (
        <div key={index} _grid={{x: index, y: 0, w: 1, h: 2}} >
          <Widget widget={widget} />
        </div>
      );
    });

    return (
      
      <div 
        ref={connectDropTarget}
        className="dashboard">
        <ReactGridLayout 
          className="layout" 
          cols={12} rowHeight={30} 
          layout={layout} >
          {_.map(this.props.dashboard.widgets, function(widget, index){
            return (
              <div key={index}>
                <Widget widget={widget} />
              </div>
            );
          })}
        </ReactGridLayout>
      </div>
    );
  }

}