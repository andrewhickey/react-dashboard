import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { configureDragDrop } from 'react-dnd';
import { DRAGGABLE_TYPES } from '../constants';
import WidgetActions from '../actions/WidgetActions';
import DashboardActions from '../actions/DashboardActions';
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
  onLayoutChange = (currentLayout) => {
    DashboardActions.updateDashboardLayout( this.props.dashboard.id, currentLayout );
  }

  render() {
    const { canDrop, isOver, connectDropTarget, dashboard } = this.props;
    const layout = dashboard.layout || [];
    return (
      
      <div 
        ref={connectDropTarget}
        className="dashboard">
        <ReactGridLayout 
          className="layout" 
          cols={12} rowHeight={50} 
          layout={layout}
          onLayoutChange={this.onLayoutChange}>
          {_.map(dashboard.widgets, function(widget, index){
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