import React, { Component } from 'react'
import { Input, Button, Card } from 'semantic-ui-react'
import Calendar from 'react-calendar'

class SubGoalForm extends Component {
  constructor(props){
    super(props)

    this.state={
      description: '',
      dueDate: new Date(),
      displayCalender: false,
      goalId: this.props.goalId
    }
  }

  handleDate = (date) => {
    let event = new Date(date)
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    return event.toLocaleDateString("en-US", options)
  }

  changeDate = dueDate => {
    this.setState({ dueDate, displayCalendar: false })
  }

  handleCalendarDisplay = () => {
    if (this.state.displayCalendar) {
      return (
        <Calendar
          onChange={this.changeDate}
          value={this.state.dueDate}
        />
      )
    } else {
      return (
        <Input fluid name="dueDate" value={this.handleDate(this.state.dueDate)}></Input>
      )
    }
  }

  handleChange = (event) =>{
    this.setState({[event.target.name]: event.target.value})
  }

  changeCalendarDisplay = (event) => {
    this.setState({displayCalendar: true})
  }

  handleSubmit = (event) => {
    console.log(this.state.dueDate)
    event.preventDefault()
    let taskUrl = 'http://localhost:3000/api/v1/sub_tasks'
    let data = {"task_id": `${this.props.goalId}`, "description": `${this.state.description}`, "due_date": `${this.state.dueDate}`}
    let configObj = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) }
    fetch(taskUrl, configObj).then(resp => this.props.fetchGoals()).then(r => this.setState({description: '',
    dueDate: new Date(),
    displayCalender: false,
    goalId: this.props.goalId}))
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input fluid onChange={this.handleChange} placeholder='Description' name='description' value={this.state.description}></Input>
          <div onClick={this.changeCalendarDisplay}>
            {this.handleCalendarDisplay()}
          </div>
          <Button className="ui button" basic color="blue" type="submit">Submit</Button>
        </form>
      </div>
    )

  }

}


export default SubGoalForm
