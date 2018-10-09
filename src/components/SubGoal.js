import React, { Component } from 'react'
import { Card, Button, Image } from 'semantic-ui-react'
import '../App.css'

class SubGoal extends Component {

  constructor(props) {
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
    let apiUrl = `http://localhost:3000/api/v1/sub_tasks/${this.props.subGoalData.id}`
    let data = {"completed": true}
    let configObj = {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)}

    this.setState({completed: true})

    setTimeout(() => {fetch(apiUrl, configObj).then(resp => resp.json()).then(this.props.fetchSubGoals)}, 3500)
  }

  incompleteSubGoal = () => {
    return (
      <div>
        <Card.Description>{this.props.subGoalData.description}</Card.Description>
        <br/>
        <Card.Description>Due Date: {this.handleDate(this.props.subGoalData.due_date)}</Card.Description>
        <br/>

        <Button basic color="green" onClick={this.handleComplete}>Complete</Button>
      </div>
    )
  }

  completeSubGoal = () => {
    return (
      <Image src={require("../images/success.gif")}/>
    )

  }

  render() {
    return (
      <Card>
        <Card.Content>
          {this.state.completed ? this.completeSubGoal() : this.incompleteSubGoal()}
        </Card.Content>
      </Card>
    )
  }



}


export default SubGoal
