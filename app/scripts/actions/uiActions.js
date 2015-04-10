import stateTree from "../stateTree";
import ajax from "ajax";

module.exports = {
  /** global **/
  toggleWidgetsPanel: function () {
    var cursor = stateTree.select('ui', 'is_widgets_open');
    cursor.update({
      $set: !cursor.get()
    });
  },
  toggleSettingsPanel: function () {
    var cursor = stateTree.select('ui', 'is_settings_open');
    cursor.update({
      $set: !cursor.get()
    });
  },

  /** reports **/
  setActiveReport(reportId) {
    var cursor = stateTree.select("ui", "reports", "active_report");
    cursor.update({
      $set: reportId
    });
  },

  setReportEditingMode(editingMode) {
    var cursor = stateTree.select("ui", "reports", "editing_mode");
    cursor.update({
      $set: editingMode
    });
  }
};