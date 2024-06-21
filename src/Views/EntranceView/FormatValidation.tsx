import React from "react";
import styles from "../../CssModule/EntranceViewCss/FormatValidation.module.scss"

export type FormatValidationProps = {
    popMessage : string
}

const FormatValidation : React.FC<FormatValidationProps> = (props) => {
    const popMessage = props.popMessage;
    return (
        <div className={styles.text_box}>
            {popMessage}
        </div>
    )
}

export default FormatValidation 