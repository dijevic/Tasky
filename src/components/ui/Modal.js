
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { unSetActiveTask } from '../../actions/tasksActions'
import { cleanMode, closeModal } from '../../actions/uiActions'
import { ListIcon } from '../icons/ListIcon'
import { Minimize } from '../icons/Minimize'
import { Tools } from '../icons/Tools'
import { ModalCategoryMode } from './ModalCategoryMode'

import { ModalTaskMode } from './ModalTaskMode'
import { ModalTitle } from './ModalTitle'

export const Modal = ({ mode }) => {
    const dispatch = useDispatch()

    const { activeTask } = useSelector(state => state.task)
    const { modalMode } = useSelector(state => state.ui)

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
        }, 100);
        dispatch(unSetActiveTask())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="ui__modal-container" onClick={handleCloseOutSite}>

            <div className="modal__container" >

                <form
                    onSubmit={handleSubmit}

                    className={(modalMode) ? `modal openModal ` : `modal closeModal `}>
                    <span
                        onClick={handleClose}
                        className="closeIcon">
                        <Minimize />
                    </span>
                    <ModalTitle title={modalMode} Icon={(modalMode === 'task') ? Tools : ListIcon} />
                    {
                        (mode === 'task')
                            ? <ModalTaskMode />
                            : <ModalCategoryMode />
                    }

                </form>



            </div>

        </div>
    )
}
