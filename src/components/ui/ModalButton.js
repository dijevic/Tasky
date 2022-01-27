import React from 'react';

export const ModalButton = ({ onClick, classes, Icon, text, type }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={classes}
            type={(type) && type}
        >
            {Icon && <Icon />}
            {
                (text && <span className="button-text">{text}</span>)
            }
        </button>
    )
};
