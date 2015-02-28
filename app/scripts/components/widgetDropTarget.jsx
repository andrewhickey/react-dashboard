import React from 'react';


var WidgetDropTarget = React.createClass({

  render() {
    var classes = React.addons.classSet({
      widgetdroptarget: true,
      open: this.state.cursors.open
    });
    return (
      <div className={classes}>
        
      </div>
    );
  }

});

module.exports = WidgetDropTarget;