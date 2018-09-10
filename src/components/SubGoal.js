import React, { Component } from 'react'
import { Card, Button, Checkbox } from 'semantic-ui-react'
import '../App.css'

class SubGoal extends Component {

  constructor(props){
    super(props)
    this.state = {
      completed: this.props.subGoalData.completed
    }
  }

  handleClick = () => {
    console.log('clicked')
  }

  handleDate = (date) => {
    let event = new Date(date)
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    return event.toLocaleDateString("en-US", options)
  }

  handleComplete = () => {
    console.log(this.props.subGoalData.id)
    this.setState({completed: true})

    let apiUrl = `http://localhost:3000/api/v1/sub_tasks/${this.props.subGoalData.id}`
    let data = {"completed": true}
    let configObj = {method: "PATCH", headers: {"Content-Type": "application/son"}, body: JSON.stringify(data)}

    setTimeout(() => {fetch(apiUrl, configObj).then(resp => resp.json()).then(console.log).then(data => this.props.fetchSubGoals())}, 3200)
  }

  render(){
    return (
      <Card>
        <Card.Content>
          <Card.Description>{this.props.subGoalData.description}</Card.Description>
          <br/>
          <Card.Description>Due Date: {this.handleDate(this.props.subGoalData.due_date)}</Card.Description>
          <br/>

          <Button basic color="green" onClick={this.handleComplete}>Complete</Button>
        </Card.Content>

        {/* <div onClick={this.handleClick}>This is a subgoal</div> */}
      </Card>
    )
  }



}


export default SubGoal
