import React, { Component } from 'react';
import Layout from './components/Layout';
import './styles/index.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Layout title="Yup..working" />
      </div>
    );
  }
}

export default App;
