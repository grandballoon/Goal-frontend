import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class LogIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_name: ''
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
      alert("log-in failed")
    }
  }

  handleSubmit = () => {
    const apiUrl='http://localhost:3000/api/v1/users'
    let formBody= this.state

    fetch(apiUrl).then(resp => resp.json()).then(data => data.find(user => user.user_name === this.state.user_name)).then(user => this.handleUser(user)).then(response => this.handleErrors(response))
  }

  render(){
  return (<div style={{paddingLeft: "30%", paddingRight: "30%"}}>
    <h1> Log In </h1>
    <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>User Name:</label>
      <input name='user_name' onChange={this.handleChange} value={this.state.user_name} placeholder='User Name' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
</div>)
  }
}

export default LogIn
