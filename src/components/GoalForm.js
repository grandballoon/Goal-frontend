import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react'
import Calendar from 'react-calendar';

class GoalForm extends Component {

  constructor(props){
    super(props)

    this.state = {
      title: '',
      description: '',
      dueDate: new Date(),
      userId: this.props.userId,
      displayCalendar: false
    }
  }

  handleDate = (date) => {
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    return date.toLocaleDateString("en-US", options)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  changeDate = dueDate => {
    console.log(dueDate)
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
        <input name="dueDate" value={this.handleDate(this.state.dueDate)}></input>
      )
    }
  }

  changeCalendarDisplay = (event) => {
    this.setState({displayCalendar: true})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let apiUrl = 'http://localhost:3000/api/v1/tasks'

    let formBody = {"title": `${this.state.title}`, "description": `${this.state.description}`, "due_date": `${this.state.dueDate}`, "user_id": `${this.state.userId}`}
    let configObj = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formBody)}

    fetch(apiUrl, configObj).then(resp => resp.json()).then(data => this.props.fetchGoals())

    this.setState({
      title: '',
      description: '',
      dueDate: new Date(),
      userId: this.props.userId,
      displayCalendar: false
    })
    this.props.hideGoalForm()
  }

  render(){
    return(
      <Card>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name="title" value={this.state.title} placeholder="Title" type="text"/>
          <textarea onChange={this.handleChange} name="description" value={this.state.description} placeholder="Description" type="text"/>
          <div onClick={this.changeCalendarDisplay}>
            {this.handleCalendarDisplay()}
          </div>
          <Button className="ui button" basic color="green" type="submit">Submit</Button>
        </form>

      </Card>

    )
  }
}

export default GoalForm
