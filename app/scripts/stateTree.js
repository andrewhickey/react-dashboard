import ReactAddons from 'react/addons';
import Baobab from 'baobab';

var stateTree = new Baobab({
  query: '',
  onlyProductsInStock: false,
  products: []
},{
  mixins: [ReactAddons.PureRenderMixin],
  shiftReferences: true
});

module.exports = stateTree;