import stateTree from "../data/stateTree";
import { maxHistoryLength } from "../constants";
import request from "browser-request";

module.exports = {
  updateDashboardLayout(dashboardId, nextLayout) {
    const dashboardCursor = stateTree.select("dashboards", dashboardId);
    dashboardCursor.set("layout", nextLayout);
  }
};