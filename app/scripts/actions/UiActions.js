import stateTree from "../stateTree";
import _ from "lodash";

module.exports = {
  /** global **/
  togglePanel: function (panelType) {
    var currentPage = stateTree.select('ui', 'current_page').get();
    var panelsCursor = stateTree.select('ui', 'pages', currentPage, panels);
    var panels = panelsCursor.get();
  },
  
  gotoPage: function(page) {
    var cursor = stateTree.select('ui', 'current_page');
    cursor.set(page);
    stateTree.commit();
  },

  /** reports **/
  setActiveReport(reportId) {
    var cursor = stateTree.select("ui", "pages", "reports", "active_report");
    cursor.set(reportId);
  },

  setReportEditingMode(editingMode) {
    var cursor = stateTree.select("ui", "pages", "reports", "editing_mode");
    cursor.set(editingMode);
  }
};