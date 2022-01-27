
import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'

import { startAddNewTask, unSetActiveTask } from '../../actions/tasksActions'
import { cleanMode, closeModal, setNewTaskMode } from '../../actions/uiActions'
import { ListIcon } from '../icons/ListIcon'
import { Minimize } from '../icons/Minimize'
import { Tools } from '../icons/Tools'
import { ModalCategoryMode } from './ModalCategoryMode'
import { ModalNewTask } from './ModalNewTask'

import { ModalTaskMode } from './ModalTaskMode'
import { ModalTitle } from './ModalTitle'


export const Modal = ({ mode }) => {
    const dispatch = useDispatch()

    const { modalMode } = useSelector(state => state.ui)
    const [dispatchData, setDispatchData] = useState(false);




    const handleCloseOutSite = ({ target }) => {

        if (target.className == 'modal__container' || target.className == 'ui__modal-container') {

            setTimeout(() => {
                dispatch(closeModal())
            }, 100);
            dispatch(unSetActiveTask())
        }


    }
    const handleClose = () => {
        setTimeout(() => {
            dispatch(closeModal())
            dispatch(cleanMode())
            dispatch(unSetActiveTask())
        }, 100);

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleGetBackTaskNewMode = () => {
        dispatch(setNewTaskMode(dispatchData))
    }




    return (
        <div className="ui__modal-container" onClick={handleCloseOutSite}>

            <div className="modal__container" >

                <form
                    onSubmit={handleSubmit}

                    className="modal openModal">
                    <span
                        onClick={handleClose}
                        className="closeIcon">
                        <Minimize />
                    </span>

                    {
                        (modalMode === 'category') &&
                        <span
                            onClick={handleGetBackTaskNewMode}
                            className="goback">
                            {/* <LeftArrow /> */}
                            create task
                        </span>
                    }
                    <ModalTitle title={modalMode} Icon={(modalMode === 'task' || modalMode === 'new task') ? Tools : ListIcon} />
                    {
                        (mode === 'task')
                            ? <ModalTaskMode />
                            : (mode === 'category')
                                ? <ModalCategoryMode />
                                : < ModalNewTask />


                    }

                </form>



            </div>

        </div>
    )
}
