import React, { useState } from 'react'

import { CloseIcon } from '../icons/CloseIcon'
import { HambuerguerMenu } from '../icons/HambuerguerMenu'
import { RockectIcon } from '../icons/RockectIcon'
import { LinkComponent } from './LinkComponent'
import { SideMenu } from './SideMenu'

export const NavBar = () => {

    const [openMenu, setOpenMenu] = useState(false);


    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <header className="navbar__header">
            <div className="container" >
                <span className="navbar__icon-span">
                    <RockectIcon />
                </span>
                <LinkComponent to="/app/profile" clases="navbar__icon-name" text=" Tasky !" />


                <div
                    onClick={handleOpenMenu}
                    className="hambuerguerMenu">
                    {
                        (openMenu) ? <CloseIcon /> : <HambuerguerMenu />
                    }
                </div>


                <SideMenu open={openMenu} setOpen={setOpenMenu} />



            </div>
        </header>
    )
}


