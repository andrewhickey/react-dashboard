import React, {Component} from 'react';
import { configureDragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import Header from '../components/Header.jsx';
import PanelsContainer from '../components/panels/PanelsContainer.jsx';
import Home from './Home';
import Reports from './Reports';

@configureDragDropContext(HTML5Backend)
export default class App extends Component{
  
  render() {
    const currentPage = this.getCurrentPage();

    return (
      <div className="app-container">
        <Header />
        <PanelsContainer />
        <div className="content">
          {{ currentPage }}      
        </div>
      </div>
    );
  }
  
  getCurrentPage() {
    switch(this.props.current_page_id) {
      case "home": return <Home />;
      case "reports": return <Reports />;
    }
  }
}