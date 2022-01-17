import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ChangePassword } from '../pages/auth/ChangePassword'
import { FinishRegistration } from '../pages/auth/FinishRegistration'
import { Login } from '../pages/auth/Login'
import { Registration } from '../pages/auth/Registration'
import { ResetPassword } from '../pages/auth/ResetPassword'
export const AuthRouter = () => {
    return (

        <div className="auth__container" >
            <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/new-user" component={Registration} />
                <Route path="/auth/reset" component={ResetPassword} />
                <Route path="/auth/finish-registration/:token" component={FinishRegistration} />
                <Route path="/auth/change-password/:token" component={ChangePassword} />
                <Redirect exact to="/auth/login" />
            </Switch>
        </div>


    )
}
