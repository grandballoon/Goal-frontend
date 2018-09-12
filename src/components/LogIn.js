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

  handleSubmit = () => {
    const apiUrl='http://localhost:3000/api/v1/users'
    let formBody= this.state

    let configObj = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formBody)}
    fetch(apiUrl, configObj).then(resp => resp.json()).then(user => this.props.handleLogIn(user)).then( () => this.props.history.push('/goals'))
  }

  render(){
  return (<div style={{paddingLeft: "30%", paddingRight: "30%"}}>
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
