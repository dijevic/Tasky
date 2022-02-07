import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setActiveTask, startDeleteTask } from '../../actions/tasksActions'
import { openModal, setTaskMode } from '../../actions/uiActions'
import { capitalizeWord } from '../../helpers/capitalize'
import { Check } from '../icons/Check'
import { Trash } from '../icons/Trash'

import { useAlert } from 'react-alert';
import { useRef } from 'react'


moment().format("MMM Do YY")

export const Task = React.memo(({ description, uuid, creationDate, completed, task_category }) => {

    const alert = useAlert()

    const capitalizeDescription = capitalizeWord(description)

    const ref = useRef(null)
    const ref2 = useRef(null)

    const dispatch = useDispatch()
    const handleClick = ({ target }) => {


        if (ref.current === target || ref2.current === target) {
            dispatch(setActiveTask({ uuid, capitalizeDescription, creationDate, completed, task_category }))
            dispatch(openModal())
            dispatch(setTaskMode())
        }

    }

    const handleDelete = async () => {
        alert.info('Deleting...')

        await dispatch(startDeleteTask(uuid, alert))



    }
    return (
        <div
            className="todo__grid-todo"
            ref={ref}
            onClick={handleClick}>

            <p
                ref={ref2}
                className={(!completed)
                    ? "todos__grid-todo-description"
                    : "todos__grid-todo-description todo-completed"}>
                {completed && <span className="checkSpanIcon"><Check /></span>}
                {capitalizeDescription}
            </p>

            <span
                onClick={handleDelete}
                className="todo__grid-todo-icon-span">

                <Trash />
            </span>

        </div>
    )
})
