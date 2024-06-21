import { UserInfo } from "../../StateTypes/EntranceStateTypes/Login"

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'


export const loginSuccess = (userinfo : UserInfo) => ({
    type: LOGIN_SUCCESS,
    payload: userinfo
})

export const loginRequest = () =>({
    type: LOGIN_REQUEST,
    payload: null
})

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
    payload: null
})