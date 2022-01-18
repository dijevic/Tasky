import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { startDeleteTask, startUpdateTask, unSetActiveTask, startCompleteTask, startRedoCompleteTask } from '../../actions/tasksActions'
import { closeModal } from '../../actions/uiActions'
import { UseForm } from '../../hooks/userForm'
import { Minimize } from '../icons/Minimize'
import { Tools } from '../icons/Tools'
import { Trash } from '../icons/Trash'
import { Check } from '../icons/Check'
import { UndoIcon } from '../icons/UndoIcon'

export const Modal = () => {
    const dispatch = useDispatch()
    const { activeTask } = useSelector(state => state.task)
    const date = moment(activeTask.creationDate).add(10, 'days').calendar()
    const initialState = {
        description: activeTask.capitalizeDescription
    }
    const [formValue, handleInputChange] = UseForm(initialState)

    const { description } = formValue
    const handleClose = () => {
        setTimeout(() => {
            dispatch(closeModal())
        }, 100);
        dispatch(unSetActiveTask())
    }

    const handleDelete = () => {
        dispatch(startDeleteTask(activeTask.uuid))
        dispatch(unSetActiveTask())
        dispatch(closeModal())
    }
    const handleUpdate = () => {
        dispatch(startUpdateTask(activeTask.uuid, { description }))
        dispatch(unSetActiveTask())
        dispatch(closeModal())
    }
    const handleCompleteTask = () => {
        if (activeTask.completed) {
            dispatch(startUpdateTask(activeTask.uuid, { completed: false }))
        } else {

            dispatch(startUpdateTask(activeTask.uuid, { completed: true }))
        }

        dispatch(unSetActiveTask())
        dispatch(closeModal())

    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleCloseOutSite = ({ target }) => {

        if (target.className == 'modal__container' || target.className == 'ui__modal-container') {

            setTimeout(() => {
                dispatch(closeModal())
            }, 100);
            dispatch(unSetActiveTask())
        }


    }

    return (
        <div className="ui__modal-container" onClick={handleCloseOutSite}>

            <div className="modal__container" >
                <form
                    onSubmit={handleSubmit}

                    className={(activeTask) ? `modal-form openModal ` : `modal-form closeModal `}>
                    <span
                        onClick={handleClose}
                        className="closeIcon">
                        <Minimize />
                    </span>
                    <h2 className="ui__modal-title">
                        <Tools />
                        Your Task </h2>
                    <input
                        type="text"
                        className=" modal__input"
                        name="description"
                        value={description}
                        onChange={handleInputChange}

                    />
                    <span className="modal__date">{`Created at :${date}`}</span>

                    <div className="modal__form-buttonsContainer">
                        <button type="button" onClick={handleUpdate} className="modal__form-button update" >Update</button>
                        <button type="button" onClick={handleCompleteTask} className="modal__form-button Complete" >
                            {
                                (activeTask.completed)
                                    ? <>
                                        <UndoIcon />
                                        <span>Undo</span>
                                    </>
                                    : <>
                                        <Check />
                                        <span>Done</span>
                                    </>
                            }


                        </button>
                        <button type="button" onClick={handleDelete} className="modal__form-button delete" >
                            <Trash />
                        </button>
                    </div>
                </form>






            </div>

        </div>
    )
}
