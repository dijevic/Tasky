import { fetchWithToken } from "../services/fetchData";

import { login } from './authActions';





export const startUpdatingUserData = (infoToUpdate, alert) => {
    return async (dispatch) => {



        try {
            const resp = await fetchWithToken(infoToUpdate, 'PUT', 'v1/user')
            const data = await resp.json()


            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                const user = {
                    id: data.id,
                    name: data.name
                }

                dispatch(login(user))

            } else {

                alert.error(`Error`, 'something wrong with password or email', 'info')
            }




        } catch (e) {
            console.log(e)
        }
    }
}



