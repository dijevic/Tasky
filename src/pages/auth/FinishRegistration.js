import React, { useEffect, useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { startRegistration } from '../../actions/authActions'
import { Spinner } from '../../components/ui/Spinner'

export const FinishRegistration = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { token } = useParams()
    const [loading, setLoading] = useState(true)
    console.log(history)

    useEffect(() => {

        if (validator.isJWT(token)) {
            dispatch(startRegistration(setLoading, token))
        } else {
            history.replace('/auth/login')
        }
    }, [dispatch])


    if (loading) {
        return (<Spinner color="#6e6ece" />)
    }



}
