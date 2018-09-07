import React, { Component } from 'react'

class SubGoal extends Component {

  constructor(props){
    super(props)
    this.state = {
      completed: false
    }
  }

  render(){
    return (
      <div>This is a subgoal</div>
    )
  }



}


export default SubGoal
