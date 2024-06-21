import React from "react";

const valid_email_addresses = ["gmail.com", "naver.com"]

export const userIdFormatCheckUtil = (user_id : string): boolean => {
    const user_id_ = user_id.trim()
    const at_char = user_id_.indexOf("@", 0)
    if (at_char !== -1) {
        const email_address = user_id_.substring(at_char + 1);
        return valid_email_addresses.includes(email_address) // boolean
    }
    return false;
}
export const passwordFormatCheckUtil = (password : string) => {
    //password should include at least 1 number and at least one capital letter and lower case letter
    //password should be longer than 10 letters (10 letters included)
    //No WhiteSpace
    const leastNumberOfPassword = 10;
    const whiteSpaceTest = /\s/.test(password)
    const numberTest = /[0-9]/.test(password)
    const lowerCaseTest = /[a-z]/.test(password)
    const upperCaseTest = /[A-Z]/.test(password)
    const leastLetterTest = (password.length >= leastNumberOfPassword)
    return !whiteSpaceTest && numberTest && lowerCaseTest && upperCaseTest && leastLetterTest
}

export const passwordCheckFormatCheckUtil = (password: string, password_check : string) => {
    return password === password_check
}
