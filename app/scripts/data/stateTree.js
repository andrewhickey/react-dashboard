import _ from 'lodash';
import ReactAddons from 'react/addons';
import Baobab from 'baobab';

import defaultState from "./defaultState";
import defaultFacets from "./defaultFacets";

//JSON.parse(localStorage.state) || 
const state = defaultState;
const facets = defaultFacets;

let stateTree = new Baobab(state, {facets: defaultFacets});

module.exports = stateTree;