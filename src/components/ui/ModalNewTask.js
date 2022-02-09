import React, { useState, useRef } from 'react';
import { useAlert } from 'react-alert'
import validator from 'validator'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { UseForm } from '../../hooks/userForm';
import Dropdown from 'react-dropdown';
import { openModal, setCategoryMode } from '../../actions/uiActions';
import { SettingIcon } from '../icons/SettingIcon';

import { ModalButton } from './ModalButton';
import { startAddNewTask } from '../../actions/tasksActions';
import astronaut from '../../assets/images/working.png'


export const ModalNewTask = () => {


    const dispatch = useDispatch()
    const alert = useAlert()
    const initialState = {
        title: '',
        description: ''
    }
    const [formValues, handleInputChange, resetValue] = UseForm(initialState)
    const ref = useRef(null)

    const { categories } = useSelector(state => state.category)

    const [category, setCategory] = useState({
        value: false,
        label: false
    });

    const { value, label } = category

    const { title, description } = formValues


    const handleSubmit = async () => {
        if (value) {
            if (validator.isEmpty(title.trim())) {
                return alert.info('Task Title is required')
            }
            alert.info('creating...')
            await dispatch(startAddNewTask({ title, description, task_category: value }, alert, label))
            resetValue()
        } else {
            alert.error('category is required')
        }

    }

    const handleChangeModalMode = () => {
        dispatch(openModal())
        dispatch(setCategoryMode())
    }

    const handleCategoryChange = (e) => {
        setCategory(e)
        ref.current.click()

    }


    return (
        <div className="modal__task">

            <picture className="modal__picture">
                <img src={astronaut} alt="astronaut working" />
            </picture>
            <div className="modal__task__dropdown-container">



                <Dropdown onChange={handleCategoryChange} options={categories} placeholder='Category' />


                <span
                    onClick={handleChangeModalMode}
                    className="modal__task__span-icon">
                    <SettingIcon />
                </span>
            </div>

            <div className="modal__task-inputGroup">

                <input
                    type="text"
                    className=" modal__task__input"
                    placeholder="Task Title"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    ref={ref}

                />


            </div>

            <div className="modal__task-inputGroup">

                <input
                    type="text"
                    className=" modal__task__input"
                    placeholder="Description"
                    autoComplete="off"
                    name="description"
                    value={description}
                    onChange={handleInputChange}


                />


            </div>

            <div className="modal__task__button-container">
                <ModalButton onClick={handleSubmit} classes="modal-button add" text="Add" type="submit" />
            </div>





        </div>
    )
};
