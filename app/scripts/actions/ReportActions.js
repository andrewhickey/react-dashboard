import stateTree from "../stateTree";
import { maxHistoryLength } from "../constants";
import request from "browser-request";

module.exports = {
  updateReportQuery(reportId, nextQuery) {
    const reportCursor = stateTree.select("reports", reportId);
    const queryCursor = reportCursor.select("query");
    if( !queryCursor.recording ) queryCursor.startRecording( maxHistoryLength );
    queryCursor.set( nextQuery );
    stateTree.commit();
    if(queryCursor.hasHistory()) reportCursor.set("canUndoQueryChanges", true);
    else reportCursor.set("canUndoQueryChanges", false);
  },

  undoReportQuery(reportId) {
    const reportCursor = stateTree.select("reports", reportId);
    const queryCursor = reportCursor.select("query");
    if(queryCursor.hasHistory()) queryCursor.undo();
    if(queryCursor.hasHistory()) reportCursor.set("canUndoQueryChanges", true);
    else reportCursor.set("canUndoQueryChanges", false);
  },

  fetchStatementsForReport(reportId) {
    const settings = stateTree.select("settings", "lrs").get();
    const reportCursor = stateTree.select("reports", reportId);
    const query = reportCursor.get().query;
    const uri = stripTrailingSlash(settings.uri) + "/api/v1/statements/aggregate";

    request({
      method:'GET', 
      uri: uri, 
      json:true,
      qs: {
        pipeline: JSON.stringify(query)
      },
      auth: {
        username: settings.username,
        password: settings.password
      }},
      handleResponse);

    function handleResponse(err, result) {
      if(!err) {
        const statements = result.body.result;
        reportCursor.update({
          statements: {
            $set: statements
          }
        })
      } else {
      }

    }
  },

};


function stripTrailingSlash(str) {
  if(str.substr(-1) == '/') 
    return str.substr(0, str.length - 1);
  return str;
}