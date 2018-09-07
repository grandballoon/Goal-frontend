import React, { Component } from 'react'
import SubGoal from './SubGoal'
import { Card } from 'semantic-ui-react'


class Goal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subGoals: [this.props.goalData.sub_tasks],
      clicked: false
    }
  }

  handleClick = () => {
    this.setState(prevState => ({clicked: !prevState.clicked}))
  }

  showSubGoals = () =>{return this.state.subGoals.map(subGoal => (<SubGoal key={subGoal.id} subGoalData={subGoal} />))}

  render(){
    return (
      <div><br />
      <Card onClick={this.handleClick}>
        <Card.Content>
          <Card.Header>{this.props.goalData.title}</Card.Header>
          <Card.Description>{this.props.goalData.description}</Card.Description>

        </Card.Content>

      </Card>

      </div>
    )
  }


}

export default Goal
