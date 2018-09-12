import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import GoalList from './components/GoalList'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import SignUp from './components/SignUp.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userId: null
    }
  }


  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Route path="/goals"   render={(props) => <GoalList {...props} userId={1} />} />
          <Route path="/signup" render={(props) => <SignUp/>}></Route>
      </React.Fragment>
      </Router>
    );
  }
}

export default App;
