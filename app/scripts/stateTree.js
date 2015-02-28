import ReactAddons from 'react/addons';
import Baobab from 'baobab';

var defaults = {
  widgets: {
    line: {
      name: 'line'
    },
    bar: {
      name: 'bar'
    },
    pie: {
      name: 'pie'
    }
  },
  ui: {
    is_widgets_open: false
  }
};
//JSON.parse(localStorage.state) || 
var state = defaults;

var stateTree = new Baobab(
  state, {
    mixins: [ReactAddons.PureRenderMixin],
    shiftReferences: true
  });

module.exports = stateTree;