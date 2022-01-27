import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useAlert } from 'react-alert'
import validator from 'validator'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { UseForm } from '../../hooks/userForm';
import Dropdown from 'react-dropdown';
import { openModal, setCategoryMode } from '../../actions/uiActions';
import { SettingIcon } from '../icons/SettingIcon';

import { ModalButton } from './ModalButton';
import { Info } from '../icons/Info';
import { startAddNewTask } from '../../actions/tasksActions';


export const ModalNewTask = ({ callback }) => {


    const dispatch = useDispatch()
    const alert = useAlert()
    const initialState = {
        description: ''
    }
    const [formValues, handleInputChange, resetValue] = UseForm(initialState)

    const { categories } = useSelector(state => state.category)

    const [category, setCategory] = useState({
        value: false,
        label: false
    });

    const { value } = category

    const { description } = formValues


    const handleSubmit = () => {
        if (value) {
            if (validator.isEmpty(description.trim())) {
                return alert.info('Task description is required')
            }

            dispatch(startAddNewTask({ description, task_category: value }, alert))
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
                    placeholder="Create the next tesla"
                    autoComplete="off"
                    name="description"
                    value={description}
                    onChange={handleInputChange}

                />


            </div>

            <ModalButton onClick={handleSubmit} classes="modal-button add" text="Add" type="submit" />





        </div>
    )
};
