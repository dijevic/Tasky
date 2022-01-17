import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTask } from '../../actions/tasksActions'
import { openModal } from '../../actions/uiActions'
import { RockectIcon } from '../icons/RockectIcon'


moment().format("MMM Do YY")

export const Task = ({ description, uuid, creationDate }) => {




    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setActiveTask({ uuid, description, creationDate }))
        dispatch(openModal())
    }
    return (
        <div
            className="todo__grid-todo"
            onClick={handleClick}
            description={description}
        >
            <p className="todos__grid-todo-description">{description}</p>

            <RockectIcon />
        </div>
    )
}
