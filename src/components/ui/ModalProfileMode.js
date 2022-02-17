import React from 'react';
import { useRef } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { startUpdatingUserData } from '../../actions/UserAction';
import { UseForm } from '../../hooks/userForm';
import { ModalButton } from './ModalButton';
import astronaut from '../../assets/images/Astronaut_11_generated.jpg'
import { capitalizeText } from '../../helpers/capitalize'

export const ModalProfileMode = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const refName = useRef(null)
    const refPassword = useRef(null)
    const alert = useAlert()

    const userCapitalized = capitalizeText(user.name)

    const initialState = {
        name: '',
        password: ''
    }

    const [formValues, handleInputChange] = UseForm(initialState)

    const { name, password } = formValues




    const handleSubmit = () => {
        dispatch(startUpdatingUserData({ name, password }, alert))
    }
    return (
        <div className="modal__task modalProfileContainer">

            <picture className="modalProfile-picture">
                <img src={astronaut} alt="astronaut profile" />
            </picture>
            <div className="modal__task-inputGroup" >
                {/* <span className="modal-inputGroup-span">Name</span> */}
                <input
                    type="text"
                    className="modal__task__input"
                    placeholder={`User Name => ${userCapitalized}`}
                    autoComplete="off"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    ref={refName}


                />
            </div>

            <div className="modal__task-inputGroup" >
                {/* <span className="modal-inputGroup-span">Password</span> */}

                <input
                    type="text"
                    className="modal__task__input"
                    placeholder="Password"
                    autoComplete="off"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    ref={refPassword}


                />
            </div>




            <div className="modal-buttonsContainer">
                <ModalButton onClick={handleSubmit} classes="modal-button add" text="Save" type="submit" />
            </div>




        </div>

    )
};
