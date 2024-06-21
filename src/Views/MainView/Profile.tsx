import React, { useEffect } from "react";
import styles from "../../CssModule/MainViewCss/Profile.module.scss"
function Profile () {
    useEffect(() => {
        const scroller = () => {
            window.scrollTo(0,0)
            console.log("scrolled");
        }
        scroller()
    }, [])
    const test = ["this", "is" , "cell", "test", "for" , "more", "test"]
    return (
        <div className={styles.container}>
            <div className={styles.header_left}>
                <div className={styles.profile_container}>
                    <div className={styles.image_container}></div>
                </div>
            </div>
            <div className={styles.header_center}>
                <div className={styles.writing_container}>
                    <p>This is writing container. You can write any writings here.</p>

                </div>
            </div>
            <div className={styles.header_right}>

            </div>
            <div className={styles.divider}>
                <div className={styles.divider_design}>

                </div>
            </div>
            <div className={styles.main_left}>
                <div className={styles.side_information}>
                    <p> Visitors: {300}</p>
                    <div className={styles.divider}/>
                    <p> More Information</p>
                </div>
            </div>
            <div className={styles.main_center}>
                {test && test.map((t) => (
                    <div className={styles.cell_design} > {t} </div>
                ))}
            </div>
            <div className={styles.main_right}></div>
        </div>
    )
}


export default Profile;