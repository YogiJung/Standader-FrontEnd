import React, { useState } from "react";
import FindCredential_check from "./FindCredential_check";
import FindCredential_email from "./FindCredential_email";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function FindCredential() {
    const state = useSelector((state: RootState) => state)
    const testButton = () => {
        console.log(state)
    }
    return(
        <div>
            {state.findCredentialReducer.viewName === 'email' && <FindCredential_email/>}
            {state.findCredentialReducer.viewName === 'check' && <FindCredential_check/>}
            <button onClick={testButton}></button>
        </div>
    )
}

export default FindCredential;
