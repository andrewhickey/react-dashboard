import ReactAddons from 'react/addons';
import Baobab from 'baobab';

var defaults = {
  widgets: {
    line: {
      type: 'line'
    },
    bar: {
      type: 'bar'
    },
    pie: {
      type: 'pie'
    }
  },
  dashboards: {
    1: {
      id: 1,
      name: "test dash",
      widgets: []
    }
  },
  ui: {
    is_widgets_open: false,
    is_settings_open: false
  },
  settings: {
    lrs_username: "d561981e8070409d45e2600473d6ec4c35104d3f",
    lrs_password: "3821bf6d1b55c6b8c2decf46c6e2b5c1d7223d7d"
  },
  test_tree: {
    is_true: true,
    number: 123,
    string_val: 'just some yarn',
    lunch: {
      type: 'soup'
    },
    dogs: [
      {
        name: "manny",
        breed: "beagle"
      },
      {
        name: "jasper",
        breed: "spaniel"
      }
    ],

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