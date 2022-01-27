import React, { useEffect } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { startRegistration } from '../../actions/authActions'
import { Spinner } from '../../components/ui/Spinner'

export const FinishRegistration = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { token } = useParams()

    useEffect(() => {

        if (validator.isJWT(token)) {
            dispatch(startRegistration(token))

        } else {
            history.replace('/auth/login')
        }
    }, [dispatch, history, token])




    return (<Spinner color="#6e6ece" />)



}
