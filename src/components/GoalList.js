import React, { Component } from 'react'
import Goal from './Goal'
import { Card, Button } from 'semantic-ui-react'
import GoalForm from './GoalForm'

class GoalList extends Component{
  constructor(props){
    super(props)

    this.state = {
      goalArray: [],
      editMode: false
    }
  }


  apiUrl = 'http://localhost:3000/api/v1/users/'

  componentDidMount(){
    this.fetchGoals()
  }

  fetchGoals = () => {
    fetch(`${this.apiUrl}${this.props.userId}`).then(resp => resp.json()).then(data => this.setState({goalArray: data.tasks}))
  }

  handleEditButton = () => {
    this.setState(prevState => ({editMode: !prevState.editMode}))
  }



  // goals = this.state.goalArray.map(goal => <Goal key={goal.id} goalData={goal} />)

  render(){
    return (
      <div>
        <Button onClick={this.handleEditButton} basic color='blue' style={{margin: "1%"}}>Add Goal</Button>
        <Card.Group>
          {this.state.goalArray.map(goal => <Goal fetchGoals={this.fetchGoals} key={goal.id} goalData={goal} />)}
          {/* {this.state.editMode ? goalFormCallback() : null} */}
          {this.state.editMode ? <GoalForm userId={1} fetchGoals={this.fetchGoals}/> : null}
        </Card.Group>
      </div>
    )
  }


}

export default GoalList
