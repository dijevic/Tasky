import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { startAddNewTask, startGetTasksByUser } from '../../actions/tasksActions'
import { Task } from '../../components/task/Task'
import { UseForm } from '../../hooks/userForm'
import { Modal } from '../../components/ui/Modal'


export const Todos = () => {

    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.task)
    const { modalOpen } = useSelector(state => state.ui)
    const [filter, setFilter] = useState('all')


    useEffect(() => {

        dispatch(startGetTasksByUser())

    }, [dispatch])


    const initialState = {
        description: ''
    }
    const [formValues, handleInputChange, resetValue] = UseForm(initialState)

    const { description } = formValues


    const handleSubmit = (e) => {
        e.preventDefault()

        if (validator.isEmpty(description.trim())) {
            return Swal.fire('Error', 'blank description', 'info')
        }

        dispatch(startAddNewTask({ description }))

        resetValue()

    }

    const handleChangeCompletedFilter = () => {
        setFilter('completed')
    }
    const handleChangeTodoFilter = () => {
        setFilter('todo')
    }
    const handleChangeAllFilter = () => {
        setFilter('all')
    }


    return (

        <>
            {
                (modalOpen) ? <Modal /> : false
            }

            <div className="todos__container">
                <h2 className="todos__title">Create your tasks , <span className="specialSentence">control your time</span>.</h2>
                <form
                    onSubmit={handleSubmit}
                    className="todos__inputGroup">

                    <input
                        type="text"
                        className=" todos__input"
                        placeholder="Create the next tesla"
                        autoComplete="off"
                        name="description"
                        value={description}
                        onChange={handleInputChange}

                    />

                    <button className="todos__inputGroup-button">Create</button>
                </form>
                <div className="todos__filter-container">
                    <button
                        type="button"
                        className="todos__filter-button all"
                        onClick={handleChangeAllFilter}>
                        All
                    </button>

                    <button
                        type="button"
                        className="todos__filter-button Completed"
                        onClick={handleChangeCompletedFilter}>
                        Completed
                    </button>

                    <button
                        type="button"
                        className="todos__filter-button uncompleted"
                        onClick={handleChangeTodoFilter}>
                        To Do
                    </button>
                </div>

                <div className="todos__Grid">
                    {
                        (filter === 'all')
                            ?
                            tasks.map(({ uuid, description, creationDate, completed }) => {
                                return <Task
                                    key={uuid}
                                    uuid={uuid}
                                    description={description}
                                    creationDate={creationDate}
                                    completed={completed} />
                            })
                            :
                            (filter === 'todo')
                                ?

                                tasks.map(({ uuid, description, creationDate, completed }) => {
                                    return (!completed) ?
                                        <Task
                                            key={uuid}
                                            uuid={uuid}
                                            description={description}
                                            creationDate={creationDate}
                                            completed={completed} />
                                        : false
                                })
                                :
                                (filter === 'completed')
                                    ?
                                    tasks.map(({ uuid, description, creationDate, completed }) => {
                                        return (completed) ?
                                            <Task
                                                key={uuid}
                                                uuid={uuid}
                                                description={description}
                                                creationDate={creationDate}
                                                completed={completed} />
                                            : false
                                    })
                                    : false
                    }

                </div>

            </div>
        </>
    )
}
