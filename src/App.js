import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import GoalList from './components/GoalList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userId: null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <GoalList userId={1} />
      </div>
    );
  }
}

export default App;
