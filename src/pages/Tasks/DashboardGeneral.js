import React, { Suspense } from 'react'

import astronauta from '../../assets/images/Astronaut_flag.jpg'
import { useSelector } from 'react-redux'
import { capitalizeText } from '../../helpers/capitalize'

const OptionCard = React.lazy(() => import('../../components/dashboard/OptionCard'))


export const DashboardGeneral = React.memo(() => {
    const { user } = useSelector(state => state.auth)


    const capitalizedName = capitalizeText(user.name)

    return (


        <>


            <div className="tasks__container">
                <h2>Welcome  <span className="tasks__dashboard-userName"> {capitalizedName}</span></h2>

                <div className="tasks__option-container">

                    <Suspense fallback={null}>

                        <OptionCard text="Go to your personal dashboard" imgSource={astronauta} to="/app/personal" />
                    </Suspense>
                    {/* <OptionCard text="Go to your personal dashboard" imgSource={teamImage} to="/app/team" /> */}



                </div>

            </div>

        </>
    )
})
