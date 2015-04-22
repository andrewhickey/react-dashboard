import React, {Component} from 'react';
import Header from '../components/Header.jsx'
import PanelsContainer from '../components/panels/PanelsContainer.jsx'

class App extends Component{
  
  render() {
    console.log(this.context);
    return (
      <div className="app-container">
        <Header />
        <PanelsContainer />
        <div className="content">
        
        </div>
      </div>
    );
  }
  
}

module.exports = App;