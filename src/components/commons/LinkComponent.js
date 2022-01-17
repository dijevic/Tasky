import React from 'react'
import { Link } from 'react-router-dom'

export const LinkComponent = ({ clases, to, Icon, text }) => {
    return (
        <Link
            className={clases}
            to={to}>
            {(Icon) ? <Icon /> : false}
            <span> {text}</span>
        </Link>
    )
}
