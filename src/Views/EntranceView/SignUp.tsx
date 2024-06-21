import React, { useEffect, useState } from "react";
import styles from "../../CssModule/EntranceViewCss/SignUp.module.scss"

import { useMutation } from "@apollo/client";
import { SignUpRequest } from "../../RESTQuery/EntranceQueryREST";
import { SignUpRequest_recv } from "../../RESTQuery/EntranceQueryREST";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormatValidation, {FormatValidationProps} from "./FormatValidation";
import { userIdFormatCheckUtil, passwordCheckFormatCheckUtil, passwordFormatCheckUtil } from "../../Utils/EntranceUtils";
function SignUp() {
    const navigation = useNavigate();
    ///SignUp Process
    const [user_id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password_check, setPasswordCheck] = useState("");
    const [storeValid, JwtStore] = useState(false)
    const [accessToken, JwtAccess] = useState("");

    ///information format check
    const [isUserIdValid, setUserIdValid] = useState<boolean>();
    const [isPasswordValid, setPasswordValid] = useState<boolean>();
    const [isPasswordCheckValid, setPasswordCheckValid] = useState<boolean>()
    const [isSubmitted, setSubmitted] = useState(false);
    const userIdInvalidMessage  = "User Id Format is Invalid"
    const passwordInvalidMessage = "Password Format is Invalid" 
    const passwordCheckInvalidMessage =  "Password is not matched" 
    
    // const [signUpRequest, {data, error, loading}] = useMutation(SignUpRequest)

    const onSubmit = async () => {
        // if (password == password_check) {
        //     signUpRequest({variables: {user_id, password}})
        // }
        setSubmitted(true)
        const signUpRequest : SignUpRequest = {
            user_id : user_id,
            password : password
        }
        console.log(isUserIdValid, isPasswordValid, isPasswordCheckValid)
        
        if (isUserIdValid && isPasswordValid && isPasswordCheckValid) {
        try {
                const response = await axios.post<SignUpRequest_recv>('https://localhost:8080/entrance/signup',signUpRequest)

                if (response.data.succeeded) {
                    JwtAccess(response.data.jwtToken.accessToken);
                    JwtStore(true);
                }
            } catch(e) {
                console.error(e);
            }
        }
    }
    useEffect(() => {
        if (storeValid) {
            localStorage.setItem("accessToken", accessToken)
            navigation("/")
        }
    }, [storeValid])

    const onIdChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        //비동기 호출 때문에 event.target.value로 raw value전달
        setId(event.target.value);
        setUserIdValid(userIdFormatCheckUtil(event.target.value))
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordValid(passwordFormatCheckUtil(event.target.value))
    }

    const onPassWordCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(event.target.value);
        setPasswordCheckValid(passwordCheckFormatCheckUtil(password, event.target.value))
    }

    
    
    

    // useEffect(() => {
    //     if (data) {
    //         console.log(data.signUpRequest.user_id);
    //         console.log(data.signUpRequest.password);
    //         console.log(data.signUpRequest.succeeded);
    //     }
    //     if (error) {
    //         console.log("Error: " ,error.message)
    //     }
    // }, [data, error])

    return(
        <div className={styles.container}>
            <div className={styles.container_box}>

                <form className={styles.form_box}>
                    <img className={styles.logo_box} src="/Assets/Standader3.svg" alt="Svg Image"/>
                    
                    <input type="text" name="user_id" className={styles.id_box} placeholder="ID" onChange={onIdChange}/>
                    {isSubmitted && !isUserIdValid && <FormatValidation popMessage = {userIdInvalidMessage}/>}
                    <br/>
                    <input type="text" name="password" className={styles.password_box} placeholder="Password" onChange={onPasswordChange}/>
                    {isSubmitted && !isPasswordValid && <FormatValidation popMessage = {passwordInvalidMessage}/>}

                    <input type="password" name="password_check" className={styles.password_check_box} placeholder="Password" onChange={onPassWordCheckChange}/>
                    {isSubmitted && !isPasswordCheckValid && <FormatValidation popMessage = {passwordCheckInvalidMessage}/>}

                    <input type="button" name="submit" className={styles.submit_box} value="SignUp" onClick={onSubmit}/>

                </form>
            </div>
        </div>
    )
}

export default SignUp;