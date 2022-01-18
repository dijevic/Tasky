import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
    BrowserRouter as Router,
    Redirect,
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
    moment.locale()

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [checking, setChecking] = useState(true)
    const today = moment().format()
    const tokenDate = moment(JSON.parse(localStorage.getItem('tokenDateStart'))).add(2, 'hours',).format()



    useEffect(() => {
        (moment(today).isSameOrAfter(tokenDate))
            ? localStorage.clear()
            :
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


