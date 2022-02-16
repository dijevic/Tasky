import Swal from 'sweetalert2'
import { fetchWithNotToken, fetchWithRegistrationToken, fetchWithResetToken, fetchWithToken } from "../services/fetchData";
import { types } from "../types/types";


export const login = (usuario) => ({
    type: types.authLogin,
    payload: { ...usuario }
})

export const logOut = () => {
    localStorage.clear()
    return {
        type: types.authLogout
    }
}



export const startLogin = (email, password, setChecking) => {
    return async (dispatch) => {

        setChecking(true)

        try {
            const resp = await fetchWithNotToken({ email, password }, 'POST', 'v1/auth/login')
            const data = await resp.json()
            console.log(data)

            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                const user = {
                    id: data.id,
                    name: data.name
                }
                setChecking(false)
                dispatch(login(user))

            } else {
                setChecking(false)
                Swal.fire(`Error`, 'something wrong with password or email', 'info')
            }




        } catch (e) {
            console.log(e)
        }
    }
}
export const startCheckingToken = (setChecking) => {
    return async (dispatch) => {

        setChecking(true)
        try {
            const resp = await fetchWithToken(null, 'GET', 'v1/auth/renew')
            const data = await resp.json()
            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                setChecking(false)
                const user = {
                    id: data.id,
                    name: data.name
                }
                dispatch(login(user))

            } else {
                setChecking(false)
                Swal.fire(`Error`, `${data.msg}`, 'info')
                localStorage.clear()
            }



        } catch (e) {
            console.log(e)
        }
    }
}

export const startEmailVerification = (email, name, password, setLoading) => {
    return async () => {

        setLoading(true)

        try {
            const resp = await fetchWithNotToken({ email, name, password }, 'POST', 'v1/auth/validate-email')
            const data = await resp.json()
            if (data.ok) {
                Swal.fire(`Great`, 'an email has been send to your email', 'info')
                setLoading(false)

            } else {
                setLoading(false)
                Swal.fire(`Error`, 'something went wrong :(', 'info')
            }




        } catch (e) {
            console.log(e)
        }
    }
}
export const startRegistration = (token) => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithRegistrationToken('v1/auth/register', token)
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
                Swal.fire(`Error`, `something went wrong :(`, 'info')
            }




        } catch (e) {
            console.log(e)
        }
    }
}

export const startResetPassword = (token) => {



    return async (dispatch) => {

        try {
            const resp = await fetchWithResetToken('v1/auth/change-password', token)
            const data = await resp.json()

            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                const user = {
                    id: data.id,
                    name: data.name
                }
                dispatch(login(user))
                Swal.fire(`Great`, `you have a new password :D`, 'info')

            } else {
                Swal.fire(`Error`, `something went wrong :(`, 'info')
            }




        } catch (e) {
            console.log(e)
        }
    }
}