import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setActiveTask } from '../../actions/tasksActions'
import { openModal } from '../../actions/uiActions'
import { RockectIcon } from '../icons/RockectIcon'
import { capitalizeWord } from '../../helpers/capitalize'


moment().format("MMM Do YY")

export const Task = React.memo(({ description, uuid, creationDate, completed }) => {


    const capitalizeDescription = capitalizeWord(description)

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setActiveTask({ uuid, capitalizeDescription, creationDate, completed }))
        dispatch(openModal())
    }
    return (
        <div
            className="todo__grid-todo"
            onClick={handleClick}
        >
            <p className={(!completed)
                ? "todos__grid-todo-description"
                : "todos__grid-todo-description todo-completed"}>
                {capitalizeDescription}
            </p>

            <RockectIcon />
        </div>
    )
})
