import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Reports from './pages/reports.jsx';
import ReportEditor from "./components/reports/ReportEditor.jsx";
import NotFound from './pages/notFound.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    <Route name="reports" handler={ Reports }>
      <Route name="reports.id" path=":reportId" handler={ ReportEditor }></Route>
    </Route>
    <Route name="home" handler={ Home } />
    <DefaultRoute handler={ Home } />
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

module.exports = routes;