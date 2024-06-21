import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./EntranceReducers/LoginReducer";
import FindCredentialReducer from "./EntranceReducers/FindCredentialReducer";
import ChatReducer from "./MainReducers/ChatReducer/ChatReducer";

const rootReducer = combineReducers({
    loginReducer: LoginReducer,
    findCredentialReducer : FindCredentialReducer,
    chatReducer : ChatReducer
});


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;