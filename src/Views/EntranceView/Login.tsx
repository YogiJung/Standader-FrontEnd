import React, { useEffect, useState } from "react";
import styles from "../../CssModule/EntranceViewCss/Login.module.scss"
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../StateManage/Actions/EntranceActions/LoginAction";
import {LoginValidation} from "../../RESTQuery/EntranceQueryREST"
import { LoginValidation_recv } from "../../RESTQuery/EntranceQueryREST";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import FormatValidation from "./FormatValidation";
//useEffect = onAppear, onChange

const submit_font = "Submit"

function Login() {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const [user_id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [isLoginInfoValid, setLoginInfovalid] = useState<boolean>()
    const loginInfoInvalidMessage = "Login Info is Invalid"
    // const [loginValidation, {data, error, loading}] = useMutation(LoginValidation)

    // useEffect(()=> {
    //     if (data) {
    //         // console.log(data.loginValidation.user_id)
    //         // console.log(data.loginValidation.password)
    //         // console.log(data.loginValidation.validated)
    //         if (data.loginValidation.validated) {
                
    //         }
    //     }
    //     if (error) {
    //         console.log("Login Error", error.message)
    //     }
    // },[data, error])

    const onSubmit = async () => {
        // loginValidation({variables: {user_id, password}})
        const loginValidation : LoginValidation = {
            user_id : user_id,
            password : password,
        }
        try {

            const response = await axios.post<LoginValidation_recv>('https://localhost:8080/entrance/login', loginValidation)
            if (response.data.validated) {
                navigation("/")
            } else {
                setLoginInfovalid(false)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const onIdChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value)
    }

    const onPasswordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }


    return (
        <div className={styles.container}>
            <div className={styles.container_box}>
                <form className={styles.form_box}>
                    <img className={styles.logo_box} src="/Assets/Standader3.svg" alt="Svg Image"/>
                    <input type="text" placeholder="ID" name="Id" className={styles.id_box} onChange={onIdChange}/>
                    <input type="password" placeholder="Password" name="Password" className={styles.password_box} onChange={onPasswordChange}/>
                    {isLoginInfoValid && <FormatValidation popMessage={loginInfoInvalidMessage}/>}
                    <input type="button" onClick={onSubmit} className={styles.submit_box} value={submit_font}/>
                    <div className={styles.link_box}>
                        <Link to="/entrance/signup" className={styles.signUp_box}>SignUp</Link>
                        <Link to="/entrance/findcredential" className={styles.findCredential_box}>Password</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;