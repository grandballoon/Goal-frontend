import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'

class SignUp extends Component {
  constructor(props){
  super(props)
    this.state = {
      user_name: '',
      email: '',
      phone_number: '',
      errors: null
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  checkForErrors = (response) => {
    if (response.errors) {
      this.setState({errors: response.errors})
    } else {
      return response
    }
  }

  handleRedirect = (user) => {
    console.log(user);
    if (user) {
      this.props.history.push('/goals')
    }
  }

  handleSubmit = () => {
    const apiUrl='http://localhost:3000/api/v1/users'
    let formBody= this.state
    let configObj = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formBody)}
    fetch(apiUrl, configObj).then(resp => resp.json()).then(response => this.checkForErrors(response))
    .then(user => this.props.handleLogIn(user)).then(user => this.handleRedirect(user))
  }

  render(){
  return (<div style={{paddingLeft: "30%", paddingRight: "30%"}}>
    <Form error onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>User Name:</label>
      <input name='user_name' onChange={this.handleChange} value={this.state.user_name} placeholder='User Name' />
    </Form.Field>
    <Form.Field>
      <label>Email:</label>
      <input name='email' onChange={this.handleChange} value={this.state.email} placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Phone Number:</label>
      <input name='phone_number' value={this.state.phone_number} placeholder='555-5555' onChange={this.handleChange}/>
    </Form.Field>
    <Button basic color='green' type='submit'>Submit</Button>
    {this.state.errors ? <Message error header='Sign Up Failed' content={this.state.errors} /> : null}
  </Form>
  <br/>
  <Button basic color='green' onClick={() => this.props.history.push('/')}>Go to Log In</Button>
</div>)
  }
}

export default SignUp
