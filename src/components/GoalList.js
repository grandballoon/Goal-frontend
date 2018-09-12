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


  urlArray = ['andy.gif', 'brad.gif', 'cheater.gif', 'michelle.gif', 'shia1.gif', 'jon.gif', 'cat_hang_in_there.gif', 'john_cena.gif', 'leslie_knope_fierce.gif', 'the_water_boy.webp', 'arnold.webp']

  apiUrl = 'http://localhost:3000/api/v1/users/'

  componentDidMount() {
    if (this.props.userId) {
      this.fetchGoals()
    } else {
      this.props.history.push('/')
    }
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
        {this.state.renderForm ? <GoalForm hideGoalForm={this.hideGoalForm} userId={this.props.userId} fetchGoals={this.fetchGoals}/> : null}
      </Card.Group>
    )
  }

  renderMotivator = () => {
    let index = Math.floor(Math.random() * this.urlArray.length)
    let url= this.urlArray[index]
    return (
      <div style={{margin: "1%"}}>
        <Image src={require(`../images/${url}`)}/>
      </div>
    )
  }

  toggleMotivator = () => {
    this.setState({motivateMode: true})
    setTimeout(() => {this.setState({motivateMode: false})}, 4000)
  }

  handleLogOut = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    return (
      <div style={{marginTop: "50px"}}>
        <Button onClick={this.handleEditButton} basic color='green' style={{margin: "1%"}}>Add Goal</Button>
        <Button onClick={this.toggleMotivator} basic color='red' style={{margin: "1%"}}>Motivate Me</Button>
        <br/>
        {this.state.motivateMode ? this.renderMotivator() : this.renderCards()}
        <br/>
        <Button onClick={this.handleLogOut} basic color='green' style={{margin: "1%"}}>Log Out</Button>
      </div>
    )
  }


}

export default GoalList
