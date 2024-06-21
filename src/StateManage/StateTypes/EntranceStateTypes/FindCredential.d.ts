import { SET_CURRENT_VIEW } from "../../Actions/EntranceActions/FindCredentialAction"

export type ViewName = 'email' | 'check'

export interface FindCredentialAction {
    type : SET_CURRENT_VIEW,
    payload: any,
}
//store의 모든 상태변수의 타입 
export interface FindCredentialState {
    viewName : string
}