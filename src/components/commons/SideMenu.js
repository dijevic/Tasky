import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { logOut } from '../../actions/authActions';
import { LogOut } from '../icons/LogOut'
import { cleaning } from '../../actions/tasksActions';
import { MoonIcon } from '../icons/MoonIcon';
import { ProfileIcon } from '../icons/ProfileIcon';
import lostImage from '../../assets/images/profile-sidebar.png'
import { capitalizeText } from '../../helpers/capitalize';
import { SunIcon } from '../icons/SunIcon';
import { useDispatch } from 'react-redux';
import { openModal, setProfileMode } from '../../actions/uiActions';
// import lostImage from '../../assets/images/alien-astronaut-2.png'

export const SideMenu = ({ open, setOpen }) => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth.user)
    const capitalizedName = capitalizeText(name)


    const handleClick = () => {
        dispatch(logOut())
        dispatch(cleaning())
    }
    const themeMode = localStorage.getItem('dark') || false

    const [darkMode, setDarkMode] = useState(themeMode);


    useEffect(() => {


        if (darkMode) {
            localStorage.setItem('dark', 'true')
        } else {

            localStorage.removeItem('dark')
        }



    }, [darkMode]);


    const handleTheme = () => {
        document.body.classList.toggle('dark')
        setDarkMode(!darkMode)

    }

    const handleModalProfile = () => {
        dispatch(setProfileMode())
        dispatch(openModal())
        setOpen(false)
    }
    return (
        <div className={(open) ? "sideBarMenu-container open" : "sideBarMenu-container"} >
            <picture className="sideBarMenu-profileLogo">
                <img src={lostImage} alt="Profile" />
                <span className="sideBarMenu-profileLogo-text">{capitalizedName}</span>
            </picture>

            <ul>
                <li
                    onClick={handleModalProfile}
                    className="sideBarMenu-option">
                    <ProfileIcon />
                    Profile</li>
                <li
                    onClick={handleTheme}
                    className="sideBarMenu-option">

                    {(darkMode) ? <SunIcon /> : <MoonIcon />}

                    {
                        (darkMode) ? 'Light Mode' : ' Dark mode'
                    }

                </li>
                <li
                    onClick={handleClick}
                    className="sideBarMenu-option logOut">
                    <LogOut />
                    Logout

                </li>
            </ul>

        </div>
    )
};
