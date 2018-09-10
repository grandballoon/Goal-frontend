import React, { Component } from 'react'
import SubGoal from './SubGoal'
import { Card, Button } from 'semantic-ui-react'


class Goal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subGoals: this.props.goalData.sub_tasks,
      clicked: false
    }
  }

  handleDate = (date) => {
    let event = new Date(date)
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    return event.toLocaleDateString("en-US", options)
  }


  handleClick = () => {
    this.setState(prevState => ({clicked: !prevState.clicked}))
  }

  showSubGoals = () =>{return this.state.subGoals.map(subGoal => (<SubGoal key={subGoal.id} subGoalData={subGoal} />))}

  render(){
    return (
      <div style={{margin: "1%"}}><br />
        <Card>
          <Card.Content>
            <Card.Header>{this.props.goalData.title}</Card.Header>
            <Card.Meta>Due Date: {this.handleDate(this.props.goalData.due_date)}</Card.Meta>
            <Card.Description>{this.props.goalData.description}</Card.Description>
            <br/>
            <Button style={{marginBottom: "3%"}} basic color='blue' onClick={this.handleClick}>{this.state.clicked ? "Hide Details" : "Show Details"}</Button>
            {this.state.clicked ? this.showSubGoals() : null}
          </Card.Content>

        </Card>

      </div>
    )
  }


}

export default Goal
