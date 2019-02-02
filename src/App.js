import React, { Component } from 'react';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    );
  }
}

export default App;
