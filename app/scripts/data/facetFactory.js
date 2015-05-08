import stateTree from './stateTree.js';
import _ from 'lodash';

export default {
  getReportFacet = _.memoize(function(reportId, metricId) {
    return tree.createFacet({
      cursors: {
        id: ['ui', 'current_page'],
        report: ['statements', 'pages']
      },
      get: function(data) {
        // 'data' is the value of your mapped cursors
        const {id, pages} = data;
        return pages[id];
      }
    });
  })
};