import React from 'react';

export const ModalButton = ({ onClick, classes, Icon, text }) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className={classes}
        >
            {Icon && <Icon />}
            {
                (text && <span className="button-text">{text}</span>)
            }
        </button>
    )
};
