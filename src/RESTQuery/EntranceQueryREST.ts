
export type LoginValidation = {
    user_id : string;
    password: string;
}

export type LoginValidation_recv = {
    user_id : string;
    password : string;
    validated : boolean;
}

export type SignUpRequest = {
    user_id : string
    password : string
}

export type SignUpRequest_recv = {
    user_id : string
    password : string
    succeeded : boolean
    jwtToken : JWTToken
}

export type ValidationToken = {
    validated : boolean
    jwtToken : JWTToken
    user_id : string
}

export type JWTToken = {
    accessToken : string
}

export type VerificationEmail = {
    email : string
}

export type VerificationCheck = {
    verificationNumber : string
}

