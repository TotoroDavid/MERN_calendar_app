import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { onChecking, onClearMessage, onLogin, onLogout } from "../store/auth/authSlice"
import { onLogoutCalendar } from "../store/calendar/calendarSlice"

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // *starting Login
    const startLogin = async ({ email, password }) => {
        // console.log({ email, password })
        dispatch(onChecking())

        try {

            const { data } = await calendarApi.post('/auth', { email, password })
            // console.log({ data })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token_init_date', new Date().getTime())

            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch ({ response }) {
            dispatch(onLogout(`credential is wrong!!!`))
            setTimeout(() => {
                dispatch(onClearMessage())
            }, 10)
            // console.log(response.data)
        }
    }

    // *starting Register
    const startRegister = async ({ email, password, name }) => {

        dispatch(onChecking())
        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token_init_date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || `credential is wrong!!!`))
            setTimeout(() => {
                dispatch(onClearMessage())
            }, 10)
            console.log(response)
        }

    }

    // *starting the re-New token
    const checkOutToken = async () => {

        const token = localStorage.getItem('token')
        if (!token) {
            return dispatch(onLogout())
        }

        try {

            const { data } = await calendarApi.get('auth/renew')
            // console.log({ data })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token_init_date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            localStorage.clear()
            return dispatch(onLogout())
        }

    }

    // * logOut and return to the loginPage
    const startLogout = async () => {

        localStorage.clear()
        dispatch(onLogoutCalendar())
        dispatch(onLogout())

    }

    return {
        //properties
        status,
        user,
        errorMessage,

        //methods!!
        startLogin,
        startRegister,
        checkOutToken,
        startLogout
    }
}