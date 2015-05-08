module.exports = {

  // Name of your facet
  currentPage: {
    // Cursors bound to your facet
    // If any of the paths listed below fire
    // an update, so will the facet.
    cursors: {
      id: ['ui', 'current_page'],
      pages: ['ui', 'pages']
    },
    get: function(data) {
      // 'data' is the value of your mapped cursors
      const {id, pages} = data;
      return pages[id];
    }
  },

  // Name of your facet
  currentReport: {
    // Cursors bound to your facet
    // If any of the paths listed below fire
    // an update, so will the facet.
    cursors: {
      id: ['ui', 'pages', 'reports', 'active_report'],
      reports: ['reports']
    },
    get: function(data) {
      // 'data' is the value of your mapped cursors
      const {reports, id} = data;
      return reports[id];
    }
  },

  // Name of your facet
  currentMetric: {
    // Cursors bound to your facet
    // If any of the paths listed below fire
    // an update, so will the facet.
    cursors: {
      id: ['ui', 'pages', 'metrics', 'active_metric'],
      metrics: ['metrics']
    },
    get: function(data) {
      // 'data' is the value of your mapped cursors
      const {metrics, id} = data;
      return metrics[id];
    }
  },

  // Other example
  filteredProjects: {
    cursors: {
      projects: ['projects']
    },
    get: function(data) {
      return data.projects.filter(function(p) {
        return p.user === 'John';
      });
    }
  },

}