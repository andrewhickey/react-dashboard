import stateTree from "../stateTree";
import { maxHistoryLength } from "../constants";
import request from "browser-request";

module.exports = {
  updateDashboardLayout(dashboardId, nextLayout) {
    /*const reportCursor = stateTree.select("reports", reportId);
    const queryCursor = reportCursor.select("query");
    if( !queryCursor.recording ) queryCursor.startRecording( maxHistoryLength );
    queryCursor.set( nextQuery );
    stateTree.commit();
    if(queryCursor.hasHistory()) reportCursor.set("canUndoQueryChanges", true);
    else reportCursor.set("canUndoQueryChanges", false);*/
  }
};