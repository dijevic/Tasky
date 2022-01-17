import React from 'react'

import astronauta from '../../assets/images/Astronaut_flag.jpg'
import { OptionCard } from '../../components/dashboard/OptionCard'
import { useSelector } from 'react-redux'


export const DashboardGeneral = () => {
    const { user } = useSelector(state => state.auth)
    const capitalizedName = user.name[0].toUpperCase() + user.name.slice(1)
    console.log(capitalizedName)

    return (
        <div className="tasks__container">
            <h2>Welcome  <span className="tasks__dashboard-userName"> {user.name}</span></h2>

            <div className="tasks__option-container">


                <OptionCard text="Go to your personal dashboard" imgSource={astronauta} to="/app/personal" />
                {/* <OptionCard text="Go to your personal dashboard" imgSource={teamImage} to="/app/team" /> */}



            </div>

        </div>
    )
}
