import React, { Component, PropTypes } from 'react';
import { configureDragDrop } from 'react-dnd';
import { DRAGGABLE_TYPES } from '../../constants';

const widgetPreviewSource = {
  beginDrag(props) {
    return {
      widget: props.widget
    };
  },
}

@configureDragDrop(

  register =>
    register.dragSource(DRAGGABLE_TYPES.WIDGET, widgetPreviewSource),

  widgetPreviewSource => ({
    connectDragSource: widgetPreviewSource.connect(),
    isDragging: widgetPreviewSource.isDragging()
  })

)

export default class WidgetPreview extends Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    widget: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { widget, isDragging, connectDragSource  } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const icon = this.getIcon();

    return (
      <div 
        ref={connectDragSource}
        className="widgetpreview"
        style={{"opacity": opacity}}
      >
        {icon}
        <div>{widget.type}</div>
      </div>
    );
  }

  getIcon() {
    switch(this.props.widget.type) {
      case 'line':  return <i className={"fa fa-line-chart"}></i>;
      case 'area':  return <i className={"fa fa-area-chart"}></i>;
      case 'bar':   return <i className={"fa fa-bar-chart"}></i>;
      case 'pie':   return <i className={"fa fa-pie-chart"}></i>;
      case 'radar': return <i className={"fa fa-area-chart"}></i>;
    }
  }

}