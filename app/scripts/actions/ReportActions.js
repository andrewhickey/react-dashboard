import stateTree from "../stateTree";
import ajax from 'ajax';

module.exports = {
  updateReport: function (cursor, object) {
    cursor.edit(object);
  }
};