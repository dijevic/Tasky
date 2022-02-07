import React, { useRef, useState } from 'react';
import Dropdown from 'react-dropdown';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { UseForm } from '../../hooks/userForm';

import { ModalButton } from './ModalButton';
import {
    startAddNewCategory,
    startDeleteCategory,
    startUpdateCategory
} from '../../actions/categoryActions';
import 'react-dropdown/style.css';


export const ModalCategoryMode = () => {

    const dispatch = useDispatch()
    const ref = useRef(null);
    const alert = useAlert()
    const { categories } = useSelector(state => state.category)

    const [showInput, setShowInput] = useState(false)
    const [currentCategory, setCurrentCategory] = useState({
        label: false,
        value: false
    })

    const { label, value } = currentCategory
    const [modeUpdate, setModeUpdate] = useState(false)

    const initialState = {
        name: ''
    }

    const [formValue, handleInputChange, reset] = UseForm(initialState)


    const { name } = formValue






    const handleShowInput = () => {

        setShowInput(!showInput)
        setCurrentCategory({
            label: false,
            value: false
        })
        reset()


    }

    const handleUpdateMode = () => {
        if (value) {
            setShowInput(!showInput)
            setModeUpdate(true)
        } else {
            alert.error('select a category')
        }
    }

    const handlenewCategoryMode = () => {
        setShowInput(!showInput)
        setModeUpdate(false)
    }

    const handleNewCategory = async () => {
        if (name.trim().length === 0) {
            return alert.error('a description is required')
        }
        alert.info('Creating...')

        await dispatch(startAddNewCategory({ name }, alert))

    }


    const handleUpdateCategory = async () => {
        if (name.trim().length === 0) {
            return alert.error('a description is required')
        }
        alert.info('Updating...')


        await dispatch(startUpdateCategory(value, name, alert))
        setCurrentCategory({
            label: false,
            value: false
        })
        ref.current.click()

    }
    const handleChangeCurrentCategory = (e) => {
        setCurrentCategory(e)

    }

    const handleDeleteCategory = async () => {
        if (value) {
            alert.info('Deleting...')
            await dispatch(startDeleteCategory(value, alert))
            setCurrentCategory({
                label: false,
                value: false
            })


        } else {
            alert.error('select a category')
        }
    }



    return (
        <div className="modal__container-category">

            {
                (!showInput)
                    ?
                    <>
                        <Dropdown onChange={handleChangeCurrentCategory} options={categories} defaultValue={value} placeholder='Select the category' />

                        <div className="modal-buttonsContainer centered ">

                            <ModalButton
                                onClick={handleUpdateMode}
                                classes="modal-button update"
                                text="Update"
                            />


                            <ModalButton
                                onClick={handlenewCategoryMode}
                                classes="modal-button add"
                                text="Add"




                            />


                            <ModalButton
                                onClick={handleDeleteCategory}
                                classes="modal-button delete"
                                text="Delete"
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
                            className="modal__form">
                            <input
                                type="text"
                                className=" modal__input"
                                autoComplete='off'
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                placeholder="New category name" />

                            <div className="modal-buttonsContainer">

                                <ModalButton
                                    onClick={handleShowInput}
                                    classes=" modal-button modal__goback back "
                                    text="Cancel"
                                    reference={ref}
                                    type={'button'}

                                />
                                <ModalButton
                                    onClick={(modeUpdate)
                                        ? handleUpdateCategory
                                        : handleNewCategory}
                                    classes="modal__button-updateCategory modal-button Complete"
                                    text="Save"


                                />

                            </div>



                        </div>
                    </>

            }
        </div>
    )
};


