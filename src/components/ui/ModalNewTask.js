import React, { useState, useRef, useEffect } from 'react';
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
    const [descriptionLength, setDescriptionLength] = useState(0)
    const [titleLength, setTitleLength] = useState(0)

    useEffect(() => {
        setTitleLength(title.trim().length)
    }, [title])


    useEffect(() => {
        setDescriptionLength(description.trim().length)
    }, [description])



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
                    maxLength={80}
                    onChange={handleInputChange}
                    ref={ref}

                />
                <span className="modal__input-length">
                    {`${titleLength}/80`}
                </span>


            </div>

            <div className="modal__input-container ">

                <textarea
                    className="modal__textArea"
                    placeholder="Description"
                    autoComplete="off"
                    maxLength={145}
                    name="description"
                    value={description}
                    onChange={handleInputChange} />
                <span className="modal__input-length">
                    {`${descriptionLength}/145`}
                </span>


            </div>

            <div className="modal__task__button-container">
                <ModalButton onClick={handleSubmit} classes="modal-button add" text="Add" type="submit" />
            </div>





        </div>
    )
};
