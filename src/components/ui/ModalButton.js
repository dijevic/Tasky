import React from 'react';

export const ModalButton = ({ onClick, classes, Icon, text, reference, type }) => {
    return (
        <button
            onClick={onClick}
            type={(type) ? type : "submit"}
            className={classes}
            ref={reference && reference}
        >
            {Icon && <Icon />}
            {
                (text && <span className="button-text">{text}</span>)
            }
        </button>
    )
};
