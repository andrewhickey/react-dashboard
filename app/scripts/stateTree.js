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
      uri: "http://staging.learninglocker.net",
      username: "7e871e4fcfe41246501905dd7ed1992d9d287da0",
      password: "1b9092d81f553bae1d4feb4726c1573dfd87c647"  
    }
  },
  reports: {
    1: {
      id: 1,
      name: "report_1",
      query: [
        {
          "$match": {
            "statement.timestamp": {
              "$gt":"2013-01-01T00:00",
              "$lt":"2015-06-02T00:00"
            }
          }
        }
      ]
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

var stateTree = new Baobab(state);

module.exports = stateTree;