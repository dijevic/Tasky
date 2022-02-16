import React, { useRef } from 'react';
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

    const { description, title } = formValue

    const date = moment(activeTask.creationDate).add(10, 'days').calendar()
    const label = activeTask.task_category.name


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
            <input
                ref={ref}
                type="text"
                className=" modal__input"
                name="title"
                value={title}
                autoComplete="off"
                onChange={handleInputChange}

            />
            <textarea
                maxLength={100}
                className="modal__textArea"
                onChange={handleInputChange}
                name="description"
                value={description}>


            </textarea>
            {/* <input
                ref={ref2}
                type="text"
                
                name="description"
                placeholder={(description.length === 0) && `empty description`}
                value={(description.length > 0) ? capitalizeWord(description) : ''}
                autoComplete="off"
               

            /> */}

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
