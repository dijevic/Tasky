import React, { useState } from 'react'
import { ShowButton } from '../../components/auth/ShowButton'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { LinkComponent } from '../../components/commons/LinkComponent'
import { RockectIcon } from '../../components/icons/RockectIcon'
import { Spinner } from '../../components/ui/Spinner'
import { forgotPasswordVerification } from '../../helpers/forgotPassword'
import { UseForm } from '../../hooks/userForm'

export const ResetPassword = () => {

    const initialState = {
        email: 'dijevic.developer@gmail.com',
        password: '456321'
    }
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formValues, changeFormValues] = UseForm(initialState)

    const { email, password } = formValues


    const handleShowPassword = () => {
        setShow(!show)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        forgotPasswordVerification(email, password, setLoading)

    }

    if (loading) {
        return (<Spinner color="#6e6ece" />)
    }
    return (
        <div className="auth__box-container">

            <h2 className="auth__box-title dark-background"> Houston We have Problems !</h2>
            <p className="auth__box-message ">Reset your Password</p>

            <form
                onSubmit={handleSubmit}
                className="auth__box-form extra-margin" >
                <label htmlFor="input" className="auth__box-inputGroup">
                    <span className="auth__box-form-span">Your Email account </span>
                    <i className="far fa-envelope"></i>
                    <input
                        type="text"
                        className=" auth__input"
                        placeholder="jhonsena@homail.com"
                        autoComplete='off'
                        id="input"
                        name="email"
                        value={email}
                        onChange={changeFormValues}
                    />
                </label>

                <label htmlFor="input2" className="auth__box-inputGroup">
                    <span className="auth__box-form-span">Choose a new password</span>
                    <i className="fas fa-key"></i>
                    <input
                        type={(!show) ? 'password' : 'text'}
                        className=" auth__input"
                        placeholder="Your password"
                        id="input2"
                        name="password"
                        value={password}
                        onChange={changeFormValues}
                    />
                    <ShowButton handleShowPassword={handleShowPassword} />
                </label>


                <SubmitButton content="Send Reset Link" />





            </form>

            <LinkComponent
                clases="link "
                Icon={RockectIcon}
                text="Go back to login"
                to="/auth/login" />

        </div >
    )
}


