export interface UserInfo {
    user_id: string,
}

export interface LoginAction {
    type: LOGIN_SUCCESS | LOGIN_FAILURE | LOGIN_REQUEST
    payload: any
}

export interface LoginState {
    userInfo: UserInfo,
    error : string,
}