import React, { useRef } from 'react';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startDeleteTask, startUpdateTask, unSetActiveTask } from '../../actions/tasksActions';
import { closeModal } from '../../actions/uiActions';
import { Check } from '../icons/Check';

import { Trash } from '../icons/Trash';
import { UndoIcon } from '../icons/UndoIcon';
import { UseForm } from '../../hooks/userForm';

import { ModalButton } from './ModalButton';
import { useAlert } from 'react-alert';


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

    const handleDelete = async () => {
        alert.info('Deleting...')
        ref.current.disabled = true
        await dispatch(startDeleteTask(activeTask.uuid, alert))
        ref.current.disabled = false
        setTimeout(() => {
            dispatch(closeModal())
            dispatch(unSetActiveTask())
        }, 300)


    }
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

            {(activeTask) && <span className="modal__taskcategory">{`Category :${label}`}</span>}
            <span className="modal__date">{`Created at :${date}`}</span>

            <div className="modal-buttonsContainer">
                <ModalButton
                    onClick={handleUpdate}
                    classes="modal-button update"
                    text="Update"
                />


                <ModalButton
                    onClick={handleCompleteTask}
                    classes="modal-button complete"
                    Icon={(activeTask.completed) ? UndoIcon : Check}
                    text={(activeTask.completed) ? "Undo" : "Done"}
                />


                <ModalButton
                    onClick={handleDelete}
                    classes="modal-button delete"
                    Icon={Trash}

                />
            </div>
        </>

    )
};
