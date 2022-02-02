
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { unSetActiveTask } from '../../actions/tasksActions'
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

    window.addEventListener('keyup', e => {

        if (e.code === 'Escape') {

            setTimeout(() => {
                dispatch(closeModal())
                dispatch(unSetActiveTask())
            }, 300);

        }

    })



    const handleCloseOutSite = ({ target }) => {

        if (target.className === 'modal__container' || target.className === 'ui__modal-container') {

            setTimeout(() => {
                dispatch(closeModal())
                dispatch(unSetActiveTask())
            }, 300);
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
        dispatch(setNewTaskMode())
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
