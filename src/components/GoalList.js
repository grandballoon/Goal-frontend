import React, { Component } from 'react'
import Goal from './Goal'
import { Card, Button } from 'semantic-ui-react'
import GoalForm from './GoalForm'

class GoalList extends Component{
  constructor(props){
    super(props)

    this.state = {
      goalArray: [],
      renderForm: false
    }
  }


  apiUrl = 'http://localhost:3000/api/v1/users/'

  componentDidMount(){
    this.fetchGoals()
  }

  fetchGoals = () => {
    fetch(`${this.apiUrl}${this.props.userId}`).then(resp => resp.json()).then(data => this.setState({goalArray: data.tasks}))
  }

  filterGoals = (goals) => {
    return goals.filter(goal => !goal.completed)
  }

  handleEditButton = () => {
    this.setState(prevState => ({renderForm: !prevState.renderForm}))
  }

  hideGoalForm = () => {
    this.setState({renderForm: false})
  }

  render(){
    return (
      <div>
        <Button onClick={this.handleEditButton} basic color='green' style={{margin: "1%"}}>Add Goal</Button>
        <Card.Group>
          {this.filterGoals(this.state.goalArray).map(goal => <Goal fetchGoals={this.fetchGoals} key={goal.id} goalData={goal} />)}
          {/* {this.state.editMode ? goalFormCallback() : null} */}
          {this.state.renderForm ? <GoalForm hideGoalForm={this.hideGoalForm} userId={1} fetchGoals={this.fetchGoals}/> : null}
        </Card.Group>
      </div>
    )
  }


}

export default GoalList
