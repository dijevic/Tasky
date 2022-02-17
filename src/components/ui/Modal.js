
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { unSetActiveTask } from '../../actions/tasksActions'
import { cleanMode, closeModal } from '../../actions/uiActions'
import { CloseIcon } from '../icons/CloseIcon'

import { ModalCategoryMode } from './ModalCategoryMode'
import { ModalNewTask } from './ModalNewTask'
import { ModalProfileMode } from './ModalProfileMode'

import { ModalTaskMode } from './ModalTaskMode'

export const Modal = ({ mode }) => {


    const dispatch = useDispatch()

    const { modalMode } = useSelector(state => state.ui)

    const ref1 = useRef(null)
    if (modalMode) {
        window.addEventListener('keyup', e => {

            if (e.code === 'Escape') {
                if (ref1.current) {

                    ref1.current.style.animationName = "fadeOutUp"
                }

                setTimeout(() => {
                    dispatch(closeModal())
                    dispatch(unSetActiveTask())
                }, 300);

            }

        })
    }




    const handleCloseOutSite = ({ target }) => {

        if (target.className === 'modal__container' || target.className === 'ui__modal-container') {
            ref1.current.style.animationName = "fadeOutUp"

            setTimeout(() => {
                dispatch(closeModal())
                dispatch(unSetActiveTask())
            }, 300);
        }


    }
    const handleClose = () => {

        ref1.current.style.animationName = "fadeOutUp"
        setTimeout(() => {
            dispatch(closeModal())
            dispatch(cleanMode())
            dispatch(unSetActiveTask())
        }, 300);

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }





    return (
        <div className="ui__modal-container" onClick={handleCloseOutSite}>

            <div className="modal__container" >

                <form
                    onSubmit={handleSubmit}
                    ref={ref1}
                    className="modal openModal">
                    <span
                        onClick={handleClose}
                        className="closeIcon">
                        <CloseIcon />
                    </span>


                    <h2 className="modal-title">
                        {
                            (modalMode === 'new task')
                                ? 'Create New Task'
                                : (modalMode === 'task')
                                    ? 'Your Task'
                                    : (modalMode === 'category')
                                        ? 'Categories'
                                        : (modalMode === 'profile') ? 'Profile'
                                            : false


                        }
                    </h2>
                    {
                        (mode === 'task')
                            ? <ModalTaskMode />
                            : (mode === 'category')
                                ? <ModalCategoryMode />
                                : (mode === 'new task')
                                    ? < ModalNewTask />
                                    : (mode === 'profile')
                                        ? < ModalProfileMode /> : false


                    }

                </form>



            </div>

        </div>
    )
}
