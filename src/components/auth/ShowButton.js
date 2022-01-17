import React from 'react'

export const ShowButton = ({ handleShowPassword }) => {
    return (
        <button
            onClick={handleShowPassword}
            type='button'
            className="auth__box-inputGroup-button"
        >Show</button>
    )
}
