import React from 'react';

export const ModalButton = ({ onClick, classes, Icon, text }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={classes}
            type="submit"
        >
            {Icon && <Icon />}
            {
                (text && <span className="button-text">{text}</span>)
            }
        </button>
    )
};
