import React, { Component } from "react"
import SubGoal from './SubGoal'
import {SortableElement} from 'react-sortable-hoc'

const SortableSubGoal = SortableElement((props) => {
  return (
    <SubGoal onSortEnd={props.onSortEnd} fetchSubGoals={props.fetchSubGoals} subGoalData={props.subGoalData} />
  )
})

export default SortableSubGoal
