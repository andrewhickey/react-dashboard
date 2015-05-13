import stateTree from './stateTree.js';
import _ from 'lodash';

export default {
  getReportFacet = _.memoize(function(reportId, metricId) {
    return tree.createFacet({
      cursors: {
        id: ['reports', ''],
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