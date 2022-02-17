import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startUpdateTask } from '../../actions/tasksActions';
import { UseForm } from '../../hooks/userForm';

import { ModalButton } from './ModalButton';
import { useAlert } from 'react-alert';
import { CalendarIcon } from '../icons/CalendarIcon';
import { BookMarkedIcon } from '../icons/BookMarkedIcon';
import { capitalizeWord } from '../../helpers/capitalize'



export const ModalTaskMode = () => {

    const ref = useRef(null)
    const ref2 = useRef(null)
    const alert = useAlert()
    const dispatch = useDispatch()
    const { activeTask } = useSelector(state => state.task)

    const initialState = {
        description: activeTask.description,
        title: activeTask.capitalizeTitle
    }
    const [formValue, handleInputChange] = UseForm(initialState)

    let { description, title } = formValue


    if (description.trim().length > 0) {
        description = capitalizeWord(description)
    }


    const date = moment(activeTask.creationDate).format("MMM Do YY")

    const label = activeTask.task_category.name

    const [titleLength, setTitleLength] = useState(0)
    const [descriptionLength, setDescriptionLength] = useState(0)

    useEffect(() => {
        setTitleLength(title.trim().length)
    }, [title])
    useEffect(() => {
        setDescriptionLength(description.trim().length)

    }, [description])


    const handleUpdate = async () => {
        alert.info('Updating...')
        ref.current.disabled = true
        ref2.current.disabled = true
        await dispatch(startUpdateTask(activeTask.uuid, { description, title }, alert))
        ref.current.disabled = false
        ref2.current.disabled = false
        alert.success('The task has been updated')


    }
    const handleCompleteTask = async () => {
        alert.info('Updating...')
        ref.current.disabled = true
        ref2.current.disabled = true
        if (activeTask.completed) {
            await dispatch(startUpdateTask(activeTask.uuid, { completed: false }, alert))
            ref.current.disabled = false
            ref2.current.disabled = false
            alert.success('Task marked as uncompleted')



        } else {
            await dispatch(startUpdateTask(activeTask.uuid, { completed: true }, alert))
            ref.current.disabled = false
            ref2.current.disabled = false
            alert.success('Task marked as completed')


        }


    }




    return (
        <>

            <div className="modal__input-container margin">
                <span className="title">Title</span>

                <input
                    ref={ref}
                    type="text"
                    className=" modal__input "
                    name="title"
                    value={title}
                    autoComplete="off"
                    maxLength={80}

                    onChange={handleInputChange}

                />
                <span className="modal__input-length">
                    {`${titleLength}/80`}

                </span>
            </div>

            <div className="modal__input-container">
                <span className="title">Description</span>

                <textarea
                    maxLength={145}
                    className="modal__textArea"
                    onChange={handleInputChange}
                    placeholder="Empty field"
                    name="description"
                    value={description}
                    ref={ref2} />

                <span className="modal__input-length">
                    {`${descriptionLength}/145`}
                </span>

            </div>



            <div className="modal__task-extra-info-container">

                <div className="modal__task-extra-info">
                    <h2 className="modal__task-extra-info-title">Date</h2>
                    <div className="modal__task-extra-info-content-wrapper">
                        <span className="modal__task-extra-info-content-icon">
                            <CalendarIcon />
                        </span>
                        <span className="modal__task-extra-info-context">{date}</span>
                    </div>
                </div>

                <div className="modal__task-extra-info">
                    <h2 className="modal__task-extra-info-title">Category</h2>
                    <div className="modal__task-extra-info-content-wrapper">
                        <span className="modal__task-extra-info-content-icon">
                            <BookMarkedIcon />

                        </span>
                        <span className="modal__task-extra-info-context">{label}</span>
                    </div>
                </div>
            </div>




            <div className="modal-buttonsContainer">
                <ModalButton
                    onClick={handleUpdate}
                    classes="modal-button update"
                    text="Save"
                />


                <ModalButton
                    onClick={handleCompleteTask}
                    classes="modal-button complete"
                    text={(activeTask.completed) ? "Undo" : "Done"}
                />



            </div>
        </>

    )
};
