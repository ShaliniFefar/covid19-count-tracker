import React, { Component } from 'react';
import './App.css';

import AllCountries from './Components/AllCountries';


class App extends Component {
 
  constructor() {
    super();
  }

  render() {

  return (
    <div className="App">
      <header className="App-header">       
      </header>
      <AllCountries/>
    </div>
  );
} 
}

export default App;
