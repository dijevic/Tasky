import React from 'react'

export const Check = ({ fill }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill={fill ? fill : 'none'}>
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

