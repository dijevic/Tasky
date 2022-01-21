import React from 'react';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startDeleteTask, startUpdateTask, unSetActiveTask } from '../../actions/tasksActions';
import { closeModal } from '../../actions/uiActions';
import { Check } from '../icons/Check';
import { Minimize } from '../icons/Minimize';
import { Tools } from '../icons/Tools';
import { Trash } from '../icons/Trash';
import { UndoIcon } from '../icons/UndoIcon';
import { UseForm } from '../../hooks/userForm';

export const ModalTaskMode = () => {


    const dispatch = useDispatch()
    const { activeTask } = useSelector(state => state.task)

    const initialState = {
        description: activeTask.capitalizeDescription
    }
    const [formValue, handleInputChange] = UseForm(initialState)

    const { description } = formValue

    const date = moment(activeTask.creationDate).add(10, 'days').calendar()


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






    return (
        <>
            <input
                type="text"
                className=" modal__input"
                name="description"
                value={description}
                onChange={handleInputChange}

            />
            <span className="modal__date">{`Created at :${date}`}</span>

            <div className="modal-buttonsContainer">
                <button type="button" onClick={handleUpdate} className="modal-button update" >Update</button>
                <button type="button" onClick={handleCompleteTask} className="modal-button Complete" >
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
                <button type="button" onClick={handleDelete} className="modal-button delete" >
                    <Trash />
                </button>
            </div>
        </>

    )
};
