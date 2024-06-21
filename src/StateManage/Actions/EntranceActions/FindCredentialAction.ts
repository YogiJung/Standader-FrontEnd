import { ViewName } from "../../StateTypes/EntranceStateTypes/FindCredential"

export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW'

export const setViewName = (viewName : ViewName) => {
    return {
        type: SET_CURRENT_VIEW,
        payload: viewName
    }
}