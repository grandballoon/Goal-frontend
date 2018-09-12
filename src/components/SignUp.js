import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class SignUp extends Component {
  constructor(props){
  super(props)
  this.state = {
    user_name: '',
    email: '',
    phone_number: ''
  }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = () => {
    const apiUrl='http://localhost:3000/api/v1/users'
    let formBody= this.state

    let configObj = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formBody)}
    fetch(apiUrl, configObj).then(resp => resp.json()).then(console.log)
  }

  render(){
  return (<div style={{paddingLeft: "30%", paddingRight: "30%"}}>
    <Form onSubmit={this.handleSubmit}>
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
    <Button type='submit'>Submit</Button>
  </Form>
</div>)
  }
}

export default SignUp
