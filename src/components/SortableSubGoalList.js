import React from 'react'
// import List from './List'
import { SortableContainer } from 'react-sortable-hoc'
import SortableSubGoal from './SortableSubGoal'

const SortableSubGoalList = SortableContainer((props) => {
  return (
    <div>
      {props.incompleteSubGoals.map((subGoal, index) => (<SortableSubGoal onSortEnd={props.onSortEnd} fetchSubGoals={props.fetchSubGoals} key={subGoal.id} index={index} subGoalData={subGoal} />))}
    <br/>
    </div>
  )
})

export default SortableSubGoalList
