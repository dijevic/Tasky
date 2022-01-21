
// import { Todos } from '../pages/Tasks/Todos'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import '../styles/styles.min.css'
import { DashboardGeneral } from '../pages/Tasks/DashboardGeneral'
import { NavBar } from '../components/commons/NavBar'
import { Footer } from '../components/commons/Footer'
import { Todos } from '../pages/Tasks/Todos'



export const TodosRouter = () => {


    return (

        <div className="appContainer">
            <NavBar />
            <Switch>
                <Route path="/app/dashboard" component={DashboardGeneral} />
                <Route path="/app/personal" component={Todos} />
                <Redirect exact to="/app/dashboard" />
            </Switch>
            <Footer />
        </div>




    )
}
