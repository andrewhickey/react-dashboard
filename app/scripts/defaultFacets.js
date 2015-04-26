module.exports = {
  // Name of your facet
  currentReport: {

    // Cursors bound to your facet
    // If any of the paths listed below fire
    // an update, so will the facet.
    cursors: {
      id: ['ui', 'reports', 'active_report'],
      reports: ['reports']
    },
    get: function(data) {
      // 'data' is the value of your mapped cursors
      const {reports, id} = data;
      return reports[id];
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