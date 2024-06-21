import { Action } from "@reduxjs/toolkit"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../Actions/EntranceActions/LoginAction"
import { LoginState, UserInfo, LoginAction } from "../../StateTypes/EntranceStateTypes/Login"
const userInfo : UserInfo = {
    user_id : ""
}
const initialStateLogin : LoginState = {
    userInfo : userInfo,
    error: "",
}

const LoginReducer = (state : LoginState = initialStateLogin, action: LoginAction) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                userInfo : action.payload,
                error: null,
            }
        case "LOGIN_REQUEST":
            return {
                ...state
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                error: "Login Failure"
            }
        default:
            return state;
    }
}

export default LoginReducer
export type RootState = ReturnType<typeof LoginReducer>

