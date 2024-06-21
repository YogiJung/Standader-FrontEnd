import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "../../CssModule/MainViewCss/MainOutlet.module.scss"
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

function MainOutlet() {
    const [isFixed, setFix] = useState<boolean>(false)
    const cs = classNames.bind(styles);
    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        let currentScroll = window.scrollY || this.document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            lastScrollTop = currentScroll;
            setFix(true)
        } else if (currentScroll < lastScrollTop && currentScroll <= 10) {
            this.window.scrollTo(0,0)
            setFix(false)
        }
    }, false)
    return(
        <div className={styles.container}>
            <div className={styles.outlet_design}>
                <Outlet/>

            </div>
            <div className={styles.main_left}>
                <div className={cs(isFixed ? 'fixed_navigator' : 'not_fixed_navigator')}>
                    
                    <div className={styles.navigator_start}>
                        
                        <div className={styles.navigator_main}>
                            <Link to="">
                                <div className={styles.svg_van_design}/>
                            </Link>
                        </div>

                        <div className={styles.navigator_divider}/>

                        <div className={styles.navigator_profile}>
                            <Link to="/profile" className={styles.link_style}>Profile</Link>
                            <div className={styles.svg_profile_design}></div>
                        </div>

                        <div className={styles.navigator_divider}/>
                        <div className={styles.navigator_chat}>
                            <Link to="chat" className={styles.link_style}>Chat</Link>
                            <div className={styles.svg_chat_design}></div>
                        </div>

                        <div className={styles.navigator_divider}/>
                        <div className={styles.navigator_van}>
                            <Link to="/van" className={styles.link_style}>Van</Link>
                            <div className={styles.svg_van_design}></div>
                        </div>
                        
                        <div className={styles.navigator_divider}/>
                    </div>
                    <div className={styles.navigator_end}>
                        <div className={styles.navigator_divider}/>
                        <div className={styles.navigator_logout}>
                            <p>Log Out</p>
                            <div className={styles.svg_logout_design}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main_right}></div>
        </div>
    )
}

export default MainOutlet;