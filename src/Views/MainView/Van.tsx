import React, { useEffect } from "react";
import styles from "../../CssModule/MainViewCss/Van.module.scss"
import { useState } from "react";
import { Link } from "react-router-dom";

function Van () {
    const [vans, setVans] = useState<string[]>(["Normal", "Normal2", "Normal3", "Normal4", "Normal5", "d", "d", "d"])
    useEffect(() => {
        const scroller = () => {
            window.scrollTo(0,0)
            console.log("scrolled");
        }
        scroller()
    }, [])
    return (
        <div className={styles.container}>
           
            <div className={styles.header_left}/>
            <div className={styles.header_center}>
                <Link to="/msn">
                    <div className={styles.svg_design}/>
                </Link>
            </div>
            <div className={styles.header_right}/>

            <div className={styles.divider_design}>
                <div className={styles.divider}/>
            </div>

            <div className={styles.main_left}></div>
            <div className={styles.main_center}>
                {vans && vans.map((van : string, index) => (
                    <div key={index} className={styles.cell_design}>
                        {van}
                    </div>
                ))}
            </div>
            <div className={styles.main_right}></div>
            <div className={styles.side_left}></div>
            <div className={styles.side_center}>

            </div>
            <div className={styles.side_right}></div>

            <footer className={styles.footer_design}>
                <p>Copyright © 2024 Standader. All rights reserved</p>
            </footer>
        </div>
    )
}

export default Van