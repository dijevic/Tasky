import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch


} from "react-router-dom"

import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './publicRoute'
import { TodosRouter } from './TodosRouter'
import { useDispatch, useSelector } from 'react-redux'
import { startCheckingToken } from '../actions/authActions'
import { Spinner } from '../components/ui/Spinner'


export const AppRouter = () => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [checking, setChecking] = useState(true)


    useEffect(() => {

        (localStorage.getItem('token'))
            ? dispatch(startCheckingToken(setChecking))
            : setChecking(false)


    }, [dispatch])

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


