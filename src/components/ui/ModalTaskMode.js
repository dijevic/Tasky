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


export const ModalTaskMode = () => {

    const ref = useRef(null)
    const alert = useAlert()
    const dispatch = useDispatch()
    const { activeTask } = useSelector(state => state.task)

    const initialState = {
        description: activeTask.capitalizeDescription
    }
    const [formValue, handleInputChange] = UseForm(initialState)

    const { description } = formValue

    const date = moment(activeTask.creationDate).add(10, 'days').calendar()
    const label = activeTask.task_category.name


    const handleUpdate = async () => {
        alert.info('Updating...')
        ref.current.disabled = true
        await dispatch(startUpdateTask(activeTask.uuid, { description }, alert))
        ref.current.disabled = false


    }
    const handleCompleteTask = async () => {
        alert.info('Updating...')
        ref.current.disabled = true
        if (activeTask.completed) {
            await dispatch(startUpdateTask(activeTask.uuid, { completed: false }, alert))
            ref.current.disabled = false


        } else {
            await dispatch(startUpdateTask(activeTask.uuid, { completed: true }, alert))
            ref.current.disabled = false

        }


    }








    return (
        <>
            <input
                ref={ref}
                type="text"
                className=" modal__input"
                name="description"
                value={description}
                onChange={handleInputChange}

            />
            {/* add decription section */}
            {/* <input
                ref={ref}
                type="text"
                className=" modal__input"
                name="description"
                value="description"
                onChange={handleInputChange}

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


            {/* {(activeTask) && <span className="modal__taskcategory">{`Category :${label}`}</span>}
            <span className="modal__date">{`Created at :${date}`}</span> */}

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
