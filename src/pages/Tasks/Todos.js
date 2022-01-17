import React, { useEffect } from 'react'
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

                <div className="todos__Grid">
                    {
                        tasks.map(({ uuid, description, creationDate }) => {
                            return <Task key={uuid} uuid={uuid} description={description} creationDate={creationDate} />
                        })
                    }

                </div>

            </div>
        </>
    )
}
