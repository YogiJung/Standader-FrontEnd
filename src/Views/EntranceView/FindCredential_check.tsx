import React, { useEffect, useRef, useState } from "react";
import styles from '../../CssModule/EntranceViewCss/FindCredential_check.module.scss'
import axios from "axios";
import { VerificationCheck } from "../../RESTQuery/EntranceQueryREST";


function FindCredential_check() {
    const [verificationNumber, setVerificationNumber] = useState("")
    const [isRendered, setRender] = useState<boolean>(false)
    const [isShown, setShown] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0)
    const shownTime : number = 1000 * 2 // ms
    const expireTime : number = 30 //s
    useEffect(() => {
        if (!isRendered) {
            setRender(true)
            const showTimer = setTimeout(() => (setShown(true)), shownTime)
            return () => clearTimeout(showTimer)
        }
    },[])

    useEffect(() => {
        if (isShown) {
            const timer = setInterval(()=> {
                setTime((prevTime) => ( prevTime+ 1))
            }, 1000)
            if (time >= expireTime) {
                setShown(false)
            }
            return () => clearInterval(timer)
        }
    },[isShown, time])
    const onSubmit = () => {
        const verificationcheck : VerificationCheck = {
            verificationNumber : verificationNumber
        }
        const response = axios.post("https://localhost:8080/entrance/verificationcheck", verificationcheck)
        console.log(response)

    }
    const onVerificationNumberChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setVerificationNumber(event.target.value)
    }
    return (
        <div className={styles.container}>
            <div className={styles.container_box}>
                <form className={styles.form_box}>
                    <input className={styles.verify_box} type="text" placeholder="Type Verification Number" onChange={onVerificationNumberChange}></input>
                    <div className={styles.time_box}>{time}</div>
                    <input type="button" className={styles.submit_box} value={"Submit"} onClick={onSubmit}></input>

                </form>
            </div>
        </div>
    )
}

export default FindCredential_check