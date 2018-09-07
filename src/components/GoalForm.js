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
      displayCalendar: false
    }
  }

  handleDate = (date) => {
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    return date.toLocaleDateString("en-US", options)
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      console.log(event.target)
    }
    // this.setState({[event.target.name]: event.target.value})
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
        <input name="dueDate" value={this.handleDate(this.state.dueDate)}></input>
      )
    }
  }

  changeCalendarDisplay = (event) => {
    this.setState({displayCalendar: true})
  }

  render(){

    return(
      <Card>
        <form className="ui form" >
          <input onChange={this.handleChange} name="title" value={this.state.title} placeholder="Title" type="text"/>
          <textarea onChange={this.handleChange} name="description" value={this.state.description} placeholder="Description" type="text"/>
          <div onFocus={this.changeCalendarDisplay}>
            {this.handleCalendarDisplay()}
          </div>
          <Button className="ui button" basic color="blue" type="submit">Submit</Button>
        </form>

      </Card>

    )
  }
}

export default GoalForm
