import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { startEmailVerification } from '../../actions/authActions'
import { ShowButton } from '../../components/auth/ShowButton'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { LinkComponent } from '../../components/commons/LinkComponent'
import { RockectIcon } from '../../components/icons/RockectIcon'
import { UseForm } from '../../hooks/userForm'
import Swal from 'sweetalert2'
import { Spinner } from '../../components/ui/Spinner'


export const Registration = () => {

    const initialState = {
        name: '',
        email: '',
        password1: '',
        password2: ''
    }
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [formValues, handleChange] = UseForm(initialState)

    const [loading, setLoading] = useState(false)


    const { name, email, password1, password2 } = formValues

    const handleShowPassword = () => {
        setShow(!show)

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validator.isEmail(email)) {
            return Swal.fire('error', 'invalid email', 'warning')
        }
        if (!validator.equals(password1, password2)) {
            return Swal.fire('error', 'check the password', 'warning')
        }
        if (validator.isEmpty(email.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(password1.trim())) {
            return Swal.fire('error', 'field empty', 'warning')
        }

        dispatch(startEmailVerification(email, name, password1, setLoading))
    }

    if (loading) {
        return (<Spinner color="#6e6ece" />)
    }

    return (
        <div className="auth__box-container">

            <h2 className="auth__box-title">Join us !</h2>
            <p className="auth__box-message">Sign up to collect your tasks.</p>

            <form
                onSubmit={handleSubmit}
                className="auth__box-form " >

                <label htmlFor="input" className="auth__box-inputGroup">
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        className=" auth__input"
                        placeholder=" User Name"
                        autoComplete='off'
                        id="input"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="input2" className="auth__box-inputGroup">
                    <i className="far fa-envelope"></i>
                    <input
                        type="email"
                        className=" auth__input"
                        placeholder=" Email"
                        autoComplete='off'
                        id="input2"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="input3" className="auth__box-inputGroup">
                    <i className="fas fa-key"></i>
                    <input
                        type={(!show) ? 'password' : 'text'}
                        className=" auth__input"
                        autoCapitalize='true'
                        placeholder="Your password"
                        id="input3"
                        name="password1"
                        value={password1}
                        onChange={handleChange}
                    />
                </label>
                <label className="auth__box-inputGroup ">

                    <input
                        type={(!show) ? 'password' : 'text'}
                        className=" auth__input repeatPassword"
                        autoCapitalize='true'
                        placeholder="repeat password"
                        name="password2"
                        value={password2}
                        onChange={handleChange}

                    />

                    <ShowButton handleShowPassword={handleShowPassword} />

                </label>


                <SubmitButton content="Create !" />





            </form>

            <LinkComponent
                clases="link "
                Icon={RockectIcon}
                text="Have an account already? Sign in"
                to="/auth/login" />



        </div >
    )
}
