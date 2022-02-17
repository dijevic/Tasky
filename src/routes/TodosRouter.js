
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useSelector } from 'react-redux'
import { DashboardGeneral } from '../pages/Tasks/DashboardGeneral'
import { NavBar } from '../components/commons/NavBar'
import { Footer } from '../components/commons/Footer'
import { Todos } from '../pages/Tasks/Todos'
import { options } from '../helpers/useAlertOptions'
import '../styles/styles.min.css'



const Modal = React.lazy(() => import('../components/ui/Modal'))

export const TodosRouter = () => {

    const { modalMode, modalOpen } = useSelector(state => state.ui)


    return (

        <AlertProvider template={AlertTemplate} {...options}>


            {
                (modalOpen) ? <Suspense fallback={null}>
                    <Modal mode={modalMode} />

                </Suspense>
                    : false

            }
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


