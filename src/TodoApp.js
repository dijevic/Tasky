import React from 'react'
import { AppRouter } from './routes/AppRouter'
import '../src/styles/styles.min.css'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const TodoApp = () => {
    return (
        <div>
            <Provider store={store} >
                <AppRouter />
            </Provider>
        </div>
    )
}
