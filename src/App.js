import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import GoalList from './components/GoalList'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import SignUp from './components/SignUp.js'
import LogIn from './components/LogIn.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo: {id: null}
    }
  }


  // componentDidMount = () => {
  //   if (!this.userInfo.id) {
  //     // this.fetchGoals()
  //     this.props.history.push('/')
  //   }
  // }

  handleLogIn = (user) => {
    this.setState({userInfo: user})
    return user
  }

  logOut = () => {
    this.setState({userInfo: {id: null}})
  }


  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Route path="/signup" render={(props) => <SignUp {...props} handleLogIn={this.handleLogIn} />} />
          <Route exact path="/" render={(props) => <LogIn {...props} handleLogIn={this.handleLogIn} />} />
          <Route path="/goals" render={(props) => <GoalList {...props} userId={this.state.userInfo.id} logOut={this.logOut} />} />
      </React.Fragment>
      </Router>
    );
  }
}

export default App;
