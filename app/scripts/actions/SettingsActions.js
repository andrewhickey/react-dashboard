import stateTree from "../data/stateTree";
import ajax from 'ajax';

module.exports = {
  addWidgetToDashboard: function (dashboard, widget) {
    var dashboard_widgets = stateTree.get(['dashboards', dashboard.id, 'widgets']);
    dashboard_widgets.push(widget);
  },
  showAllProducts: function () {
    stateTree.set('onlyProductsInStock', false);
  },
  searchProducts: function (query) {
    stateTree.set('query', query);
    ajax.get('/products', query)
      .done(function (products) {
        stateTree.set('products', products);
      });
  }
};