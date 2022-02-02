import React, { useState } from 'react'
import validator from 'validator'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { StarIcon } from '../../components/icons/StarIcon'
import { UseForm } from '../../hooks/userForm'
import { startLogin } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { Spinner } from '../../components/ui/Spinner'
import { ShowButton } from '../../components/auth/ShowButton'

export const Login = () => {


    const dispatch = useDispatch()
    const initialLoginState = {
        email: '',
        password: '',
    }
    const [formLoginValues, handleInputChange] = UseForm(initialLoginState)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const { email, password } = formLoginValues



    const handleSubmit = (e) => {
        e.preventDefault()

        if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
            return Swal.fire('Error', 'complete all the fields', 'error')

        }
        // distpach
        dispatch(startLogin(email, password, setLoading))
    }

    const handleShowPassword = () => {
        setShow(!show)
    }


    if (loading) {
        return (<Spinner color="#6e6ece" />)
    }



    return (

        <div className="auth__box-container">


            <h2 className="auth__box-title"> Hello !</h2>
            <p className="auth__box-message">Sign into your account here.</p>

            <form
                onSubmit={handleSubmit}
                className="auth__box-form " >

                <label htmlFor="input" className="auth__box-inputGroup">
                    <i className="far fa-envelope"></i>
                    <input
                        type="text"
                        className=" auth__input"
                        autoCapitalize='words'
                        placeholder="YourEmail"
                        autoComplete='off'
                        id="input"
                        name="email"
                        onChange={handleInputChange}
                        value={email}
                    />
                </label>
                <label htmlFor="input2" className="auth__box-inputGroup">
                    <i className="fas fa-key"></i>
                    <input
                        type={(!show) ? 'password' : 'text'}
                        className=" auth__input"
                        placeholder="Your password"
                        id="input2"
                        name="password"
                        onChange={handleInputChange}
                        value={password}
                    />
                    <ShowButton handleShowPassword={handleShowPassword} />
                </label>


                <SubmitButton content="Login" />




            </form>
            <Link
                className="link"
                to="/auth/new-user">
                <StarIcon />
                <span> Don't have an account? Sign up</span>
            </Link>

            <Link
                className="link"
                to="/auth/reset">
                <StarIcon />
                <span> Forgot your password? reset it here !</span>
            </Link>

        </div >
    )
}
