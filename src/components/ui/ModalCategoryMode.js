import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Check } from '../icons/Check';
import { PlusIcon } from '../icons/PlusIcon';
import { Trash } from '../icons/Trash';

export const ModalCategoryMode = () => {

    const [showInput, setShowInput] = useState(false)


    const handleUpdate = () => {
        setShowInput(true)
    }

    const change = false
    return (
        <div className="modal__container-category">
            <Dropdown placeholder='opciones' />
            <div className="modal-buttonsContainer category-buttons-container">
                {
                    (!showInput)

                        ?
                        <>
                            <button
                                type="button"
                                className="modal-button update"
                                onClick={handleUpdate}

                            >Update
                            </button>
                            <button
                                type="button"

                                className="modal-button Complete" >

                                <PlusIcon />
                            </button>

                            <button
                                type="button"
                                className="modal-button delete" >
                                <Trash />
                            </button>
                        </>
                        :
                        <div className="modal-container-inputUpdatecategory">
                            <input
                                type="text"
                                className=" modal__input"
                                name="description"
                                placeholder="New Name" />

                            <span className="modal-iconSpan">
                                <Check />
                            </span>
                        </div>
                    // value={description}
                    // onChange={handleInputChange}

                }





            </div>
        </div>
    )
};
