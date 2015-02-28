var stateTree = require('../stateTree');
var ajax = require('ajax');

module.exports = {
  showOnlyProductsInStock: function () {
    stateTree.set('onlyProductsInStock', true);
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