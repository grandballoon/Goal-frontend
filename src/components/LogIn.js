import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'

class LogIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: '',
      displayErrorMessage: false
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleUser = (user) => {
    if (user != null){
      this.props.handleLogIn(user)
      return "success"
    }else {
      return "failure"
    }
  }

  handleErrors = (response) => {
    if (response === "success"){
      this.props.history.push('/goals')
    }else{
      this.setState({displayErrorMessage: true})
    }
  }

  handleSubmit = () => {
    const apiUrl='http://localhost:3000/api/v1/users'
    
    fetch(apiUrl).then(resp => resp.json()).then(data => data.find(user => user.user_name === this.state.user_name)).then(user => this.handleUser(user)).then(response => this.handleErrors(response))
  }

  render(){
  return (<div style={{paddingLeft: "30%", paddingRight: "30%"}}>
    <h1> Log In </h1>
    <Form error onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>User Name:</label>
      <input name='user_name' onChange={this.handleChange} value={this.state.user_name} placeholder='User Name' />
    </Form.Field>
    <Button basic color='green' type='submit'>Submit</Button>
    {this.state.displayErrorMessage ? <Message error header='User Name Not Found' content="Please enter a valid user name" /> : null}
  </Form>
  <h3>Don't have an account?</h3>
  <Button basic color='green' onClick={() => this.props.history.push('/signup')}>Sign Up</Button>
</div>)
  }
}

export default LogIn
