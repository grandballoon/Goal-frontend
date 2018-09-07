import React, { Component } from 'react'
import Goal from './Goal'
import { Card } from 'semantic-ui-react'



class GoalList extends Component{
  constructor(props){
    super(props)

    this.state = {
      goalArray: []
    }
  }


  apiUrl = 'http://localhost:3000/api/v1/users/'

  componentDidMount(){
    fetch(`${this.apiUrl}${this.props.userId}`).then(resp => resp.json()).then(data => this.setState({goalArray: data.tasks}, () => {console.log(this.state)}))
  }

  // goals = this.state.goalArray.map(goal => <Goal key={goal.id} goalData={goal} />)

  render(){
    return (
      <div>
        <Card.Group>
        {this.state.goalArray.map(goal => <Goal key={goal.id} goalData={goal} />)}
        </Card.Group>
      </div>
    )
  }


}

export default GoalList
