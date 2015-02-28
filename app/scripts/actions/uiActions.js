var stateTree = require('../stateTree');
var ajax = require('ajax');

module.exports = {
  toggleWidgetsPanel: function () {
    stateTree.set('onlyProductsInStock', true);
    var cursor = stateTree.select('ui', 'is_widgets_open');
    
    cursor.update({
      $set: !cursor.get()
    });
  },
};