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
    },
    radar: {
      type: 'radar'
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
    is_settings_open: false,
    reports: {
      active_report: null,
      editing_mode: 1
    }
  },
  settings: {
    lrs : {
      uri: "http://lrs.learninglocker.net",
      username: "d561981e8070409d45e2600473d6ec4c35104d3f",
      password: "3821bf6d1b55c6b8c2decf46c6e2b5c1d7223d7d"  
    }
  },
  reports: {
    1: {
      id: 1,
      name: "report_1",
      query: {}
    },
    2: {
      id: 2,
      name: "report_2",
      query: [
        {
          "$match": {
            "statement.timestamp": {
              "$gt":"2013-01-01T00:00",
              "$lt":"2015-06-02T00:00"
            }
          }
        }
      ],
      statements: [
      ]
    }
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