import React from 'react';

export const TurnIcon = ({ stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-power"


            width="30"

            height="30"

            viewBox="0 0 24 24"

            strokeWidth="1.5"
            stroke={(stroke) ? stroke : "#2c3e50"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round" >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 6a7.75 7.75 0 1 0 10 0" />
            <line x1="12" y1="4" x2="12" y2="12" />
        </svg >
    )
};
