import React, { useEffect, useState, Suspense } from 'react'

import Dropdown from 'react-dropdown';
import { useDispatch, useSelector } from 'react-redux'
import { startGetTasksByUser } from '../../actions/tasksActions'
import { setCategoryActive, startGetcategorysByUser, UnSetCategoryActive } from '../../actions/categoryActions'
import { Task } from '../../components/task/Task'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { openModal, setNewTaskMode } from '../../actions/uiActions';
import { TurnIcon } from '../../components/icons/TurnIcon';
import { getArrayLength } from '../../helpers/getArryLength'
import 'react-dropdown/style.css';
const Modal = React.lazy(() => import('../../components/ui/Modal'))







export const Todos = () => {


    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.task)
    const { categories, activeCategory } = useSelector(state => state.category)
    const { modalMode } = useSelector(state => state.ui)

    const { modalOpen } = useSelector(state => state.ui)
    const [filter, setFilter] = useState('all')
    const [tasksLength, setTasksLength] = useState(0)

    useEffect(() => {

        dispatch(startGetTasksByUser())
        dispatch(startGetcategorysByUser())


    }, [dispatch])

    const handleCategoryChange = () => {
        dispatch(setNewTaskMode())
        dispatch(openModal())

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
    const handleOnchange = async (e) => {
        await dispatch(setCategoryActive(e))



    }

    useEffect(() => {
        getArrayLength(tasks, filter, activeCategory, setTasksLength)

    }, [activeCategory, filter, tasks])



    const handlesetCategoryActived = () => {

        dispatch(UnSetCategoryActive())

    }



    return (

        <>
            {
                (modalOpen) ? <Suspense fallback={null}>
                    <Modal mode={modalMode} />

                </Suspense>
                    : false

            }

            <div className="todos__container">
                <h2
                    className="todos__title">
                    Create your tasks ,
                    <span

                        className="specialSentence">
                        control your time
                    </span>
                </h2>

                <div
                    onClick={handleCategoryChange}
                    className="todos__createTask">
                    <PlusIcon />
                    <h2 className="todos__createTask-text">Create New task </h2>
                </div>


                <div className="todos__filter-container">
                    <button
                        type="button"
                        className={(filter === 'all')
                            ? "todos__filter-button all selected"
                            : "todos__filter-button all"}
                        onClick={handleChangeAllFilter}>
                        All
                    </button>

                    <button
                        type="button"
                        className={(filter === 'completed')
                            ? "todos__filter-button Completed selected"
                            : "todos__filter-button Completed"}
                        onClick={handleChangeCompletedFilter}>
                        Completed
                    </button>

                    <button
                        type="button"
                        className={
                            (filter === 'todo')
                                ? "todos__filter-button uncompleted selected"
                                : "todos__filter-button uncompleted"}
                        onClick={handleChangeTodoFilter}>
                        To Do
                    </button>




                </div>
                <div className="todos__dropdown-container">

                    <Dropdown onChange={handleOnchange} options={categories} placeholder='Category' />


                    {
                        (activeCategory) &&
                        <span
                            onClick={handlesetCategoryActived}
                            className="todos__span-icon"
                        >

                            <TurnIcon />
                            turn Off
                        </span>
                    }

                </div>


                <h2
                    className="todos__category-title">
                    {(activeCategory) ? `${activeCategory.label}(${tasksLength})` : `Total ( ${tasksLength} )`}
                </h2>





                <div className="todos__Grid">

                    {
                        (!activeCategory)

                            ?

                            (filter === 'all')
                                ?
                                tasks.map(({ uuid, description, creationDate, completed, task_category, title }) => {
                                    return <Task
                                        key={uuid}
                                        uuid={uuid}
                                        description={description}
                                        creationDate={creationDate}
                                        completed={completed}
                                        title={title}
                                        task_category={task_category}
                                    />
                                })
                                :
                                (filter === 'todo')
                                    ?

                                    tasks.map(({ uuid, description, creationDate, completed, task_category, title }) => {
                                        return (!completed) ?
                                            <Task
                                                key={uuid}
                                                uuid={uuid}
                                                description={description}
                                                creationDate={creationDate}
                                                completed={completed}
                                                title={title}
                                                task_category={task_category} />
                                            : false
                                    })
                                    :
                                    (filter === 'completed')
                                        ?
                                        tasks.map(({ uuid, description, creationDate, completed, task_category, title }) => {
                                            return (completed) ?
                                                <Task
                                                    key={uuid}
                                                    uuid={uuid}
                                                    description={description}
                                                    creationDate={creationDate}
                                                    completed={completed}
                                                    title={title}
                                                    task_category={task_category} />
                                                : false
                                        })
                                        : false

                            :

                            (filter === 'all')
                                ?
                                tasks.map(({ uuid, description, creationDate, completed, task_category, title }) => {
                                    return (task_category.uuid === activeCategory.value)
                                        ?
                                        <Task
                                            key={uuid}
                                            uuid={uuid}
                                            description={description}
                                            creationDate={creationDate}
                                            completed={completed}
                                            title={title}
                                            task_category={task_category}
                                        /> : false
                                })
                                :
                                (filter === 'todo')
                                    ?

                                    tasks.map(({ uuid, description, creationDate, completed, task_category, title }) => {
                                        return (!completed && task_category.uuid === activeCategory.value) ?
                                            <Task
                                                key={uuid}
                                                uuid={uuid}
                                                description={description}
                                                creationDate={creationDate}
                                                completed={completed}
                                                title={title}
                                                task_category={task_category} />
                                            : false
                                    })
                                    :
                                    (filter === 'completed')
                                        ?
                                        tasks.map(({ uuid, description, creationDate, completed, task_category, title }) => {
                                            return (completed && task_category.uuid === activeCategory.value) ?
                                                <Task
                                                    key={uuid}
                                                    uuid={uuid}
                                                    description={description}
                                                    creationDate={creationDate}
                                                    completed={completed}
                                                    title={title}
                                                    task_category={task_category} />
                                                : false
                                        })
                                        : false
                    }

                </div>

            </div>

        </>
    )
}
