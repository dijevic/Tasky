
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { unSetActiveTask } from '../../actions/tasksActions'
import { closeModal } from '../../actions/uiActions'
import { Minimize } from '../icons/Minimize'
import { Tools } from '../icons/Tools'
import { ModalCategoryMode } from './ModalCategoryMode'

import { ModalTaskMode } from './ModalTaskMode'
import { ModalTitle } from './ModalTitle'

export const Modal = ({ mode }) => {
    const dispatch = useDispatch()

    const { activeTask } = useSelector(state => state.task)

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

                    className={(activeTask) ? `modal openModal ` : `modal closeModal `}>
                    <span
                        onClick={handleClose}
                        className="closeIcon">
                        <Minimize />
                    </span>
                    <ModalTitle title="task " Icon={Tools} />
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
