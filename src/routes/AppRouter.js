import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch

} from "react-router-dom"


import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './publicRoute'
import { useDispatch, useSelector } from 'react-redux'
import { startCheckingToken } from '../actions/authActions'
import { Spinner } from '../components/ui/Spinner'
import { AuthRouter } from './AuthRouter'
import { TodosRouter } from './TodosRouter'




export const AppRouter = () => {


    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [checking, setChecking] = useState(true)


    useEffect(() => {

        if (localStorage.getItem('token')) {
            dispatch(startCheckingToken(setChecking))
        } else {
            setChecking(false)
        }



    }, [dispatch])

    // dark-mode

    useEffect(() => {

        const darkMode = localStorage.getItem('dark') || false


        if (darkMode === 'true') {
            document.body.classList.add('dark')

        }

    }, [])


    if (checking) {
        return (<Spinner color="#6e6ece" />)
    }
    return (
        <Router>
            <div>

                <Switch>
                    <PublicRoute
                        component={AuthRouter}
                        isAuth={user}
                        path="/auth" />

                    <PrivateRoute
                        path="/app"
                        component={TodosRouter}
                        isAuth={user} />


                    <Redirect to="/auth" />
                </Switch>
            </div>
        </Router>
    )
}


