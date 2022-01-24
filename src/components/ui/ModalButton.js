import React from 'react';

export const ModalButton = ({ onClick, classes, Icon, text, id }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={classes}
            id={(id) && id}
        >
            {Icon && <Icon />}
            {
                (text && <span className="button-text">{text}</span>)
            }
        </button>
    )
};
