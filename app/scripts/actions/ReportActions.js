import stateTree from "../stateTree";
import request from "browser-request";

module.exports = {
  updateReport(cursor, object) {
    cursor.edit(object);
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
        console.log(result.body);
      }

    }
  },

};


function stripTrailingSlash(str) {
  if(str.substr(-1) == '/') 
    return str.substr(0, str.length - 1);
  return str;
}