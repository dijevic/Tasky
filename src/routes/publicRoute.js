import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({ component: Component, isAuth, ...rest }) => {

    return (
        <Route {...rest} component={(props) => (

            (isAuth)
                ? <Redirect to="/app" />
                : <Component {...props} />
        )
        } />
    )
}
