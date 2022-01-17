import React from 'react'
import { Link } from 'react-router-dom'

export const OptionCard = ({ text, imgSource, to }) => {
    return (
        <div className="tasks__dashboard-option">
            <Link className="anchor" to={to} >

                <img src={imgSource} />
                <span>{text}</span>
            </Link>
        </div>
    )
}
