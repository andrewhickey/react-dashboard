import ReactAddons from 'react/addons';
import Baobab from 'baobab';

import defaultState from "./defaultState";
import defaultFacets from "./defaultFacets";

//JSON.parse(localStorage.state) || 
var state = defaultState;
var facets = defaultFacets;

var stateTree = new Baobab(state, {facets: defaultFacets});

module.exports = stateTree;