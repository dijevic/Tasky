import Swal from "sweetalert2"
import { fetchWithNotToken } from "../services/fetchData"

export const forgotPasswordVerification = async (email, password, setLoading) => {
    setLoading(true)
    try {
        const resp = await fetchWithNotToken({ email, password }, 'PUT', 'v1/auth/forgot-password')
        const data = await resp.json()

        if (data.ok) {
            Swal.fire(`Great`, 'an email has been send to your email', 'info')
            setLoading(false)

        } else {
            setLoading(false)
            Swal.fire(`Error`, `something went wrong :(`, 'info')
        }




    } catch (e) {
        console.log(e)
    }

}