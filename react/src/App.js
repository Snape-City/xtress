import React, { Component } from 'react';
import Socket from './components/socket.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="top-level-container">
        <Dashboard />
        <Socket />
      </div>
    );
  }
}
