import React, { useEffect, useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { startResetPassword } from '../../actions/authActions'
import { Spinner } from '../../components/ui/Spinner'

export const ChangePassword = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { token } = useParams()
    const [loading, setLoading] = useState(false)
    console.log(history)

    useEffect(() => {

        if (validator.isJWT(token)) {
            dispatch(startResetPassword(setLoading, token))
        } else {
            history.replace('/auth/login')
        }
    }, [dispatch])


  

    return (
        <Spinner color="#6e6ece" />
    )


}
