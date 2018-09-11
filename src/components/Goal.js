import React, { Component } from 'react'
import SubGoal from './SubGoal'
import { Card, Button, Image } from 'semantic-ui-react'
import SubGoalForm from './SubGoalForm'
import SortableSubGoal from './SortableSubGoal'
import SortableSubGoalList from './SortableSubGoalList'
import {arrayMove} from 'react-sortable-hoc'


class Goal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subGoals: [],
      clicked: false,
      subGoalClicked: false,
      completed: this.props.goalData.completed
    }
  }

  componentDidMount(){
    this.fetchSubGoals()
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    // console.log(this.state.subGoals);

    let selectSubGoal = this.state.subGoals[oldIndex]

    this.setState({subGoals: arrayMove(this.state.subGoals, oldIndex, newIndex)}, () => {

      let updatedSubGoals = this.state.subGoals

      updatedSubGoals.forEach((subGoal, index) => {
        subGoal.order = index + 1
        let apiUrl = `http://localhost:3000/api/v1/sub_tasks/${subGoal.id}`
        let configObj = {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(subGoal)}
        fetch(apiUrl, configObj).then(resp => resp.json())
      })


      // let apiUrl = `http://localhost:3000/api/v1/tasks/${this.props.goalData.id}`
      // let formBody = {"sub_tasks": updatedSubGoals}
      // let configObj = {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formBody)}
      // fetch(apiUrl, configObj).then(resp => resp.json()).then(console.log)

    })
}

  fetchSubGoals = () => {
    let subGoalUrl = `http://localhost:3000/api/v1/tasks/${this.props.goalData.id}`
    fetch(subGoalUrl).then(resp => resp.json()).then(data => data.sub_tasks.sort((a, b) => a.order - b.order)).then(sortedSubGoals => this.setState({subGoals: sortedSubGoals}))
  }

  handleDate = (date) => {
    let event = new Date(date)
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    return event.toLocaleDateString("en-US", options)
  }


  handleClick = () => {
    this.setState(prevState => ({clicked: !prevState.clicked}))
  }

  handleCompletion = () => {
    let apiUrl = `http://localhost:3000/api/v1/tasks/${this.props.goalData.id}`
    let formBody = {"completed": true}
    let configObj = {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formBody)}

    this.setState({completed: true})

    setTimeout(() => {fetch(apiUrl, configObj).then(resp => resp.json()).then(data => this.props.fetchGoals())}, 3500)

  }

  // showSubGoals = () =>{return this.state.subGoals.filter(subGoal => !subGoal.completed).map((subGoal, index) => (<SortableSubGoal fetchSubGoals={this.fetchSubGoals} key={subGoal.id} index={index} subGoalData={subGoal} />))}

  showSubGoals = () => {
    const incompleteSubGoals = this.state.subGoals.filter(subGoal => !subGoal.completed)

    return <SortableSubGoalList onSortEnd={this.onSortEnd} fetchSubGoals={this.fetchSubGoals} incompleteSubGoals={incompleteSubGoals} />
  }


  subGoalForm = () => {
    return (
      <SubGoalForm resetSubGoalForm={this.resetSubGoalForm} fetchGoals={this.fetchSubGoals} goalId={this.props.goalData.id} subGoalArrayLength={this.state.subGoals.length}></SubGoalForm>
    )
  }

  resetSubGoalForm = () => {
    this.setState({subGoalClicked: false })
  }

  subGoalButtonHandleClick = () =>{
    this.setState(prevState => ({subGoalClicked: !prevState.subGoalClicked }))
  }

  subGoalButton = () => {
    return (
      <Button style={{marginBottom: "3%"}} basic color='green' onClick={this.subGoalButtonHandleClick}>New Sub-Goal</Button>
    )
  }

  incompleteGoal = () => {
    return (
      <Card.Content>
        <Card.Header>{this.props.goalData.title}</Card.Header>
        <Card.Meta>Due Date: {this.handleDate(this.props.goalData.due_date)}</Card.Meta>
        {this.state.completed ? null : <Card.Meta>Not Completed</Card.Meta>}
        <Card.Description>{this.props.goalData.description}</Card.Description>
        <br/>
        <Button style={{marginBottom: "3%"}} basic color='green' onClick={this.handleCompletion}>Mark as Complete</Button>
        <Button style={{marginBottom: "3%"}} basic color='green' onClick={this.handleClick}>{this.state.clicked ? "Hide Details" : "Show Details"}</Button>
        {this.state.clicked ? this.showSubGoals() : null}
        {this.state.clicked ? this.subGoalButton() : null}
        {this.state.subGoalClicked ? this.subGoalForm() : null}
      </Card.Content>
    )
  }

  completeGoal = () => {
    return (
      <Image src={require('../images/success.gif')}/>
    )
  }

  render(){
    return (
      <div style={{margin: "1%"}}><br />
        <Card>
          {this.state.completed ? this.completeGoal() : this.incompleteGoal()}
        </Card>

      </div>
    )
  }


}

export default Goal
