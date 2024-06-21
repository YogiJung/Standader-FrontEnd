import {FindCredentialAction, FindCredentialState} from '../../StateTypes/EntranceStateTypes/FindCredential'

const initialStateFindCredential : FindCredentialState = {
    viewName : 'email'
}

const FindCredentialReducer = (state = initialStateFindCredential, action : FindCredentialAction) => {
    switch(action.type) {
        case "SET_CURRENT_VIEW":
            return {
                ...state,
                viewName : action.payload
            }
        default:
            return state
    }
}

export default FindCredentialReducer