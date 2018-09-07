import React, { Component } from 'react'
import Goal from './Goal'
import { Card, Button } from 'semantic-ui-react'



class GoalList extends Component{
  constructor(props){
    super(props)

    this.state = {
      goalArray: []
    }
  }


  apiUrl = 'http://localhost:3000/api/v1/users/'

  componentDidMount(){
    fetch(`${this.apiUrl}${this.props.userId}`).then(resp => resp.json()).then(data => this.setState({goalArray: data.tasks}))
  }

  // goals = this.state.goalArray.map(goal => <Goal key={goal.id} goalData={goal} />)

  render(){
    return (
      <div>
        <Button basic color='blue' style={{margin: "1%"}}>Add Goal</Button>
        <Card.Group>
        {this.state.goalArray.map(goal => <Goal key={goal.id} goalData={goal} />)}
        </Card.Group>
      </div>
    )
  }


}

export default GoalList
