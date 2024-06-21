import React, { useState } from "react";
import styles from '../../CssModule/EntranceViewCss/FindCredential_email.module.scss'
import { useDispatch } from "react-redux";
import { setViewName } from "../../StateManage/Actions/EntranceActions/FindCredentialAction";
import { VerificationEmail } from "../../RESTQuery/EntranceQueryREST";
import { userIdFormatCheckUtil } from "../../Utils/EntranceUtils";

import axios from "axios";
import FormatValidation from "./FormatValidation";
function FindCredential_email() {
    const dispatch = useDispatch();
    const [credential, find] = useState("")
    const [isUserIdValid, setUserIdValid] = useState<boolean>()
    const [popUserIdInvalidMessage, setPopUserIdInvalidMessage] = useState<boolean>()
    const userIdInvalidMessage = "Email Invalid"
        const onSubmit = () => {
            const verificationEmail : VerificationEmail = {
                email: credential
            }
            if (isUserIdValid) {
                const response = axios.post("https://localhost:8080/entrance/verificationemail", verificationEmail)
            } else {
                setPopUserIdInvalidMessage(false)
            }
            
            
            dispatch(setViewName('check'))
        }
        const onCredentialChange = (event : React.ChangeEvent<HTMLInputElement>) => {
            find(event.target.value);
            setUserIdValid(userIdFormatCheckUtil(event.target.value))
        }
        
    return(
        <div className={styles.container}>
            <div className={styles.container_box}>
                <form className={styles.form_box}>
                    <input type="text" className={styles.credential_box} placeholder="Email or Phone number" onChange={onCredentialChange}></input>
                    {popUserIdInvalidMessage && <FormatValidation popMessage={userIdInvalidMessage}/>}
                    <input type="button" className={styles.submit_box} value="Submit" onClick={onSubmit}></input>

                </form>
            </div>
        </div>
    )
}

export default FindCredential_email;