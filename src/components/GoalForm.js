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
      dueDate: new Date()
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

  onChange = date => {
    debugger
    this.setState({ dueDate })
  }

  render(){

    return(
      <Card>
        <form className="ui form" >
          <input onChange={this.handleChange} name="title" value={this.state.title} placeholder="Title" type="text"/>
          <textarea onChange={this.handleChange} name="description" value={this.state.description} placeholder="Description" type="text"/>
          {/* <DateInput onChange={this.handleChange} name="dueDate" value={this.handleDate(this.state.dueDate)}/> */}
          <Calendar
           onChange={this.onChange}
           value={this.state.dueDate}
         />
        </form>

      </Card>

    )
  }
}

export default GoalForm
