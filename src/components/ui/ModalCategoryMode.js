import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startAddNewCategory, startDeleteCategory, startUpdateCategory } from '../../actions/categoryActions';
import { cleanMode, closeModal } from '../../actions/uiActions';
import { UseForm } from '../../hooks/userForm';
import { Check } from '../icons/Check';
import { Info } from '../icons/Info';
import { LeftArrow } from '../icons/LeftArrow';
import { PlusIcon } from '../icons/PlusIcon';
import { Trash } from '../icons/Trash';
import { UpdateIcon } from '../icons/UpdateIcon';
import { ModalButton } from './ModalButton';


export const ModalCategoryMode = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    const [showInput, setShowInput] = useState(false)
    const [showError, setShowError] = useState(false);
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


    const handleShowInput = (e) => {

        if (e.target.className == 'modal-button update' || e.target.className == 'button-text') {

            if (value) {
                setShowInput(!showInput)
                setModeUpdate(true)
            } else {
                setShowError(true)
            }

        } else if (e.target.className == 'modal-button add') {
            setShowInput(!showInput)
            setShowError(false)
            setModeUpdate(false)

        } else {
            setShowInput(!showInput)
            setCurrentCategory({
                label: false,
                value: false
            })
            reset()
        }

    }

    const handleNewCategory = () => {
        dispatch(startAddNewCategory({ name }))

    }


    const handleUpdateCategory = () => {

        dispatch(startUpdateCategory(value, name))
        setCurrentCategory({
            label: false,
            value: false
        })
    }
    const handleChangeCurrentCategory = (e) => {
        setCurrentCategory(e)
        setShowError(false)



    }

    const handleDeleteCategory = () => {
        if (value) {
            dispatch(startDeleteCategory(value))
            setCurrentCategory({
                label: false,
                value: false
            })

        } else {
            setShowError(true)
        }
    }



    return (
        <div className="modal__container-category">

            {
                (!showInput)
                    ?
                    <>
                        <Dropdown onChange={handleChangeCurrentCategory} options={categories} defaultValue={value} placeholder='Select the category' />
                        {(showError) &&
                            <p className="modal-error">
                                <Info />
                                choose a category
                            </p>}
                        <div className="modal-buttonsContainer ">

                            <ModalButton
                                onClick={handleShowInput}
                                classes="modal-button update"
                                text="Update"
                            />


                            <ModalButton
                                onClick={handleShowInput}
                                classes="modal-button add"
                                Icon={PlusIcon}

                            />


                            <ModalButton
                                onClick={handleDeleteCategory}
                                classes="modal-button delete"
                                Icon={Trash}
                            />





                        </div>
                    </>

                    :

                    <>
                        {
                            (modeUpdate) &&
                            <h2 className="modal__form-category-name">
                                Category selected :
                                <span className="modal__category-nameSelected">{label}</span>
                            </h2>
                        }
                        <div
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
                                onClick={handleShowInput}
                                className="modal__goback back">
                                <LeftArrow />
                                Go back
                            </span>
                        </div>
                    </>

            }
        </div>
    )
};


