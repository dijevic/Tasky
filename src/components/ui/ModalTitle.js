import React from 'react';

export const ModalTitle = ({ title, Icon }) => {
    return (

        <>
            <h2 className="ui__modal-title">
                <Icon />
                {title}
            </h2>
        </>
    )

};
