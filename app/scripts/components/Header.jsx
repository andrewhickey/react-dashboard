import React from 'react';
import UiActions from '../actions/UiActions';
import {branch} from 'baobab-react/higher-order';
import classNames from 'classnames';
import _ from 'lodash';

var Header = React.createClass({
  _openPanel: function(panelId, e) {
    if(e) e.preventDefault();
    UiActions.togglePanel(panelId);
  },

  _gotoPage: function(page, e) {
    e.preventDefault();
    UiActions.gotoPage(page);
  },


  render() {
    const { pages, currentPage } = this.props;
    
    const panelLinks = _.map(currentPage.panels, function(panel, index) {
      const classes = classNames({
        'active': panel.isOpen,
        'nav-item': true
      });
      return (
        <div className={classes} key={index}>
          <a href='#' onClick={this._openPanel.bind(this, index)}>{panel.name}</a>
        </div>
      );
    },this);

    const pageLinks = _.map(pages, function(page, index) {
      const classes = classNames({
        'active': currentPage.id === index,
        'nav-item': true
      });
      return (
        <div className={classes} key={index}>
          <a href='#' onClick={this._gotoPage.bind(this,index)}>{page.name}</a>
        </div>
      );
    },this);

    const divider = panelLinks.length > 0 ? (
      <div className="nav-item">|</div>
    ) : null;

    return (
      <header>
        <div className="dashboard-logo">Dashboard</div>
        <nav>
          {pageLinks}
          {divider}
          {panelLinks}
        </nav>
      </header>
    );
  }

});

module.exports = branch(Header, {
  cursors: {
    pages: ["ui", "pages"]
  },
  facets: {
    currentPage: "currentPage"
  }
});