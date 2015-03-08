import stateTree from "../stateTree";
import ajax from "ajax";

module.exports = {
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
};