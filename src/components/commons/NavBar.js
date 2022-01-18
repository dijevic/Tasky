import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../actions/authActions'
import { cleaning } from '../../actions/tasksActions'
import { LogOut } from '../icons/LogOut'
import { RockectIcon } from '../icons/RockectIcon'
import { LinkComponent } from './LinkComponent'

export const NavBar = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(logOut())
        dispatch(cleaning())
    }
    return (
        <header className="navbar__header">
            <div className="container" >
                <RockectIcon />
                <LinkComponent to="/app/profile" clases="navbar__icon-name" text=" Tasky !" />
                <div
                    onClick={handleClick}
                    className="navbar__header-logout">
                    <LogOut />
                    <span
                        className="navbar__header-logout-span" >
                        Logout

                    </span>

                </div>


            </div>
        </header>
    )
}
