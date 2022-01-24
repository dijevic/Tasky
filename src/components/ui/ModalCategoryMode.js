import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startAddNewCategory, startDeleteCategory, startUpdateCategory } from '../../actions/categoryActions';
import { UseForm } from '../../hooks/userForm';
import { Check } from '../icons/Check';
import { LeftArrow } from '../icons/LeftArrow';
import { PlusIcon } from '../icons/PlusIcon';
import { Trash } from '../icons/Trash';
import { UpdateIcon } from '../icons/UpdateIcon';

export const ModalCategoryMode = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    const [showInput, setShowInput] = useState(false)
    const [currentCategory, setCurrentCategory] = useState({
        label: false,
        value: false
    })

    const { label, value } = currentCategory
    const [modeUpdate, setModeUpdate] = useState(true)

    const initialState = {
        name: ''
    }

    const [formValue, handleInputChange, reset] = UseForm(initialState)


    const { name } = formValue


    const handleCategoryChange = (e) => {

        setShowInput(!showInput)

        if (e.target.className == 'modal-button update') {
            setModeUpdate(true)
        } else if (e.target.className == 'modal-button add') {
            setModeUpdate(false)
        } else {
            reset()
        }

    }

    const handleNewCategory = () => {
        console.log(name)
        dispatch(startAddNewCategory({ name }))

    }


    const handleUpdateCategory = () => {
        dispatch(startUpdateCategory(value, name))
    }
    const handleChange = (e) => {
        setCurrentCategory(e)

    }

    const handleDeleteCategory = () => {
        dispatch(startDeleteCategory(value))
    }



    return (
        <div className="modal__container-category">

            {
                (!showInput)
                    ?
                    <>
                        <Dropdown onChange={handleChange} options={categories} defaultValue={value} placeholder='Select the category' />
                        <div className="modal-buttonsContainer ">

                            <button
                                type="button"
                                className="modal-button update"
                                onClick={handleCategoryChange}

                            >
                                <UpdateIcon />
                                Update
                            </button>

                            <button
                                onClick={handleCategoryChange}
                                type="button"
                                className="modal-button add" >
                                <PlusIcon />
                                Add
                            </button>

                            <button
                                onClick={handleDeleteCategory}
                                type="button"
                                className="modal-button delete" >
                                <Trash />
                                delete
                            </button>

                        </div>
                    </>

                    :

                    <>
                        <h2 className="modal__form-category-name">{label}</h2>
                        <form
                            onSubmit={handleUpdateCategory}
                            className="modal__form">
                            <input
                                type="text"
                                className=" modal__input"
                                autoComplete='off'
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                placeholder="New category name" />


                            <button
                                onClick={(modeUpdate) ? handleUpdateCategory : handleNewCategory}
                                className="modal__button-updateCategory modal-button Complete">
                                <Check />
                                Done

                            </button>
                            <span
                                onClick={handleCategoryChange}
                                className="modal__goback back">
                                <LeftArrow />
                                Go back
                            </span>
                        </form>
                    </>

            }
        </div>
    )
};


