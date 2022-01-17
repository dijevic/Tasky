import React from 'react'
import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const Spinner = ({ height = 100, width = 100, color = '#6e6ece' }) => {
    return (
        <div className="spinner">
            <TailSpin
                color={color}
                height={height}
                width={width}

            // timeout={20000} //3 secs
            />

            <span className="spinner__span"> Loading... </span>
        </div>
    )
}