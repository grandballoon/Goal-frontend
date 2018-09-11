import React, { Component } from 'react'
import Goal from './Goal'
import { Card, Button, Image } from 'semantic-ui-react'
import GoalForm from './GoalForm'
import Iframe from 'react-iframe'

class GoalList extends Component{
  constructor(props){
    super(props)

    this.state = {
      goalArray: [],
      renderForm: false,
      motivateMode: false
    }
  }


  urlArray = ['andy.gif', 'brad.gif', 'cheater.gif', 'michelle.gif', 'shia1.gif', 'jon.gif']

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

  renderCards = () => {
    return (
      <Card.Group>
        {this.filterGoals(this.state.goalArray).map(goal => <Goal fetchGoals={this.fetchGoals} key={goal.id} goalData={goal} />)}
        {/* {this.state.editMode ? goalFormCallback() : null} */}
        {this.state.renderForm ? <GoalForm hideGoalForm={this.hideGoalForm} userId={1} fetchGoals={this.fetchGoals}/> : null}
      </Card.Group>
    )
  }

  renderMotivator = () => {
    let index = Math.floor(Math.random() * this.urlArray.length)
    let url= this.urlArray[index]
    return(
      // <Image src={require(url)}/>
      // <Image src={require('../images/andy.gif')}/>
      <Image src={require(`../images/${url}`)}/>

    )
  }

  toggleMotivator = () => {
    this.setState({motivateMode: true})
    setTimeout(() => {this.setState({motivateMode: false})}, 3500)
  }

  render(){
    return (
      <div>
        <Button onClick={this.handleEditButton} basic color='green' style={{margin: "1%"}}>Add Goal</Button>
        <Button onClick={this.toggleMotivator} basic color='red' style={{margin: "1%"}}>Motivate Me</Button>
        <br/>
        {this.state.motivateMode ? this.renderMotivator() : this.renderCards()}
      </div>
    )
  }


}

export default GoalList
