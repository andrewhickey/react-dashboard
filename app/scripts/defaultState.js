module.exports = {
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
    /** GLOBAL **/
    current_page: "reports",

    /** PAGES **/
    pages: {
      home: {
        name: "Home",
        panels: {
          "settings": {
            isOpen: false,
            name: "Settings"
          },
          "widgets": {
            isOpen: true,
            name: "Widgets"
          }
        }  
      },
      reports: {
        name: "Reports",
        panels: {
          "settings": {
            isOpen: false,
            name: "Settings"
          }
        },
        active_report: 1,
        editing_mode: 1
      }
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
              "$gt":"2014-01-01T00:00",
              "$lt":"2014-01-05T00:00"
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
      ]
      ,
      statements: [
      ]
    }
  }
};