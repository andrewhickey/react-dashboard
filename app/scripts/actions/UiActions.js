import stateTree from "../data/stateTree";
import _ from "lodash";

module.exports = {
  /** GLOBAL **/
  togglePanel: function (panelType) {
    var currentPage = stateTree.select('ui', 'current_page').get();
    var panelCursor = stateTree.select('ui', 'pages', currentPage, "panels", panelType);
    panelCursor.set("isOpen", !panelCursor.get("isOpen"));
  },
  
  gotoPage: function(page) {
    var cursor = stateTree.select('ui', 'current_page');
    cursor.set(page);
  },

  /** REPORTS **/
  setActiveReport(reportId) {
    var cursor = stateTree.select("ui", "pages", "reports", "active_report");
    cursor.set(reportId);
  },

  setReportEditingMode(editingMode) {
    var cursor = stateTree.select("ui", "pages", "reports", "editing_mode");
    cursor.set(editingMode);
  },

  /** METRICS **/
  setActiveMetric(metricId) {
    var cursor = stateTree.select("ui", "pages", "metrics", "active_metric");
    cursor.set(metricId);
  },

  setMetricEditingMode(editingMode) {
    var cursor = stateTree.select("ui", "pages", "metrics", "editing_mode");
    cursor.set(editingMode);
  },
};