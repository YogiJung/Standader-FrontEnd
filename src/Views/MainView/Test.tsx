import React from "react";
import styles from "../../CssModule/MainViewCss/Test.module.scss"
function Test() {
    return (
        <div className={styles.dark}>
        <header className={`${styles.flex} ${styles.itemsCenter} ${styles.justifyBetween} ${styles.p4}`}>
            <div className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX4}`}>
            <span className={`${styles.relative} ${styles.flex} ${styles.h10} ${styles.w10} ${styles.shrink0} ${styles.overflowHidden} ${styles.roundedFull}`}>
                <img className={`${styles.aspectSquare} ${styles.hFull} ${styles.wFull}`} alt="User avatar" src="/placeholder.svg?height=32&width=32" />
            </span>
            <input className={`${styles.flex} ${styles.h10} ${styles.wFull} ${styles.roundedMd} ${styles.border} ${styles.borderInput} ${styles.px3} ${styles.py2} ${styles.textSm} ${styles.ringOffsetBackground} ${styles.fileBorder0} ${styles.fileBgTransparent} ${styles.fileTextSm} ${styles.fileFontMedium} ${styles.placeholderTextMutedForeground} ${styles.focusVisibleOutlineNone} ${styles.focusVisibleRing2} ${styles.focusVisibleRingRing} ${styles.focusVisibleRingOffset2} ${styles.disabledCursorNotAllowed} ${styles.disabledOpacity50} ${styles.bgGray200} ${styles.darkBgGray800}`} placeholder="Search" />
            </div>
            <nav className={`${styles.flex} ${styles.spaceX4}`}>
            <a className={styles.textGray200} href="#">Nav item 1</a>
            <a className={styles.textGray200} href="#">Nav item 2</a>
            <a className={styles.textGray200} href="#">Nav item 3</a>
            <a className={styles.textGray200} href="#">Nav item 4</a>
            </nav>
            <button className={`${styles.inlineFlex} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.whitespaceNowrap} ${styles.roundedMd} ${styles.textSm} ${styles.fontMedium} ${styles.ringOffsetBackground} ${styles.transitionColors} ${styles.focusVisibleOutlineNone} ${styles.focusVisibleRing2} ${styles.focusVisibleRingRing} ${styles.focusVisibleRingOffset2} ${styles.disabledPointerEventsNone} ${styles.disabledOpacity50} ${styles.textPrimaryForeground} ${styles.hoverBgPrimary90} ${styles.h10} ${styles.px4} ${styles.py2} ${styles.bgGray200} ${styles.darkBgGray800}`}>
            Button
            </button>
        </header>
        <main className={`${styles.flex}`}>
            <aside className={`${styles.w14} ${styles.p4} ${styles.spaceY4}`}>
            <div className={`${styles.flex} ${styles.flexCol}`}>
                <div className={`${styles.flex} ${styles.itemsCenter} ${styles.justifyBetween}`}>
                <h2 className={`${styles.textXl} ${styles.fontBold}`}>Section 1</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.textGray200} ${styles.darkTextGray800}`}>
                    <circle cx="12.1" cy="12.1" r="1"></circle>
                </svg>
                </div>
                <ul className={`${styles.mt4} ${styles.spaceY2}`}>
                {/* List items will go here */}
                </ul>
            </div>
            {/* ... Repeat for other sections */}
            </aside>
            <section className={`${styles.w12} ${styles.p4}`}>
            <h1 className={`${styles.text3Xl} ${styles.fontBold} ${styles.mb4}`}>Main Content Title</h1>
            <div className={`${styles.spaceY4}`}>
                {/* Content blocks will go here */}
            </div>
            </section>
            <aside className={`${styles.w14} ${styles.p4} ${styles.spaceY4}`}>
            {/* Additional sidebar content will go here */}
            </aside>
        </main>
    </div>
    )
}



export default Test;