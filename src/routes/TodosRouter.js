
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { DashboardGeneral } from '../pages/Tasks/DashboardGeneral'
import { NavBar } from '../components/commons/NavBar'
import { Footer } from '../components/commons/Footer'
import { Todos } from '../pages/Tasks/Todos'
import '../styles/styles.min.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 2000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

export const TodosRouter = () => {


    return (

        <AlertProvider template={AlertTemplate} {...options}>
            <NavBar />
            <Switch>
                <Route path="/app/dashboard" component={DashboardGeneral} />
                <Route path="/app/personal" component={Todos} />
                <Redirect exact to="/app/dashboard" />
            </Switch>
            <Footer />

        </AlertProvider>








    )
}


