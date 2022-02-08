import React from 'react'
import { AppRouter } from './routes/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'animate.css';
import '../src/styles/styles.min.css'

export const TodoApp = () => {


    return (

        <Provider store={store} >

            <AppRouter />
        </Provider>

    )
}
