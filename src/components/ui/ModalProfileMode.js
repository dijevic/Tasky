import React from 'react';
import { useRef } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { startUpdatingUserData } from '../../actions/UserAction';
import { UseForm } from '../../hooks/userForm';
import { ModalButton } from './ModalButton';

export const ModalProfileMode = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const refName = useRef(null)
    const refPassword = useRef(null)


    const initialState = {
        name: '',
        password: ''
    }

    const [formValues, handleInputChange] = UseForm(initialState)

    const { name, password } = formValues

    const handleClick = ({ target }) => {

        if (target === refName.current) {

            refName.current.parentElement.firstElementChild.style.top = '-10px'

        } else {
            refPassword.current.parentElement.firstElementChild.style.top = '-10px'
        }
    }


    const handleSubmit = () => {
        dispatch(startUpdatingUserData({ name, password }, alert))
    }
    return (
        <div className="modal__task modalProfileContainer">
            <div className="modal__task-inputGroup" >
                <span className="modal-inputGroup-span">Name</span>
                <input
                    type="text"
                    className="modal__task__input"
                    placeholder=""
                    autoComplete="off"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    onClick={handleClick}
                    ref={refName}


                />
            </div>

            <div className="modal__task-inputGroup" >
                <span className="modal-inputGroup-span">Password</span>

                <input
                    type="text"
                    className="modal__task__input"
                    placeholder=""
                    autoComplete="off"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    onClick={handleClick}
                    ref={refPassword}


                />
            </div>




            <div className="modal-buttonsContainer">
                <ModalButton onClick={handleSubmit} classes="modal-button add" text="Save" type="submit" />
            </div>




        </div>

    )
};
