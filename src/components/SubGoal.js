import React, { Component } from 'react'
import { Card, Button, Checkbox } from 'semantic-ui-react'
import '../App.css'

class SubGoal extends Component {

  constructor(props){
    super(props)
    this.state = {
      completed: false
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

  render(){
    return (
      <Card>
        <Card.Content>
          <Card.Description>{this.props.subGoalData.description}</Card.Description>
          <br/>
          <Card.Description>Due Date: {this.handleDate(this.props.subGoalData.due_date)}</Card.Description>
          <br/>

          <Button basic color="green">Complete</Button>
        </Card.Content>

        {/* <div onClick={this.handleClick}>This is a subgoal</div> */}
      </Card>
    )
  }



}


export default SubGoal
