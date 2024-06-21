import {gql} from '@apollo/client'


//loginValidation은 주고 받는 객체의 이름이다. data.loginValidation또는 서버에선 함수의 이름으로 쓰여진다.

//Entrance / Login.tsx
export const LoginValidation = gql`
    mutation LoginValidation($user_id : ID!, $password : String! ){
        loginValidation(user_id: $user_id, password: $password){ 
            user_id
            password
            validated
        }
    }
`

//Entrance / SignUp.tsx
export const SignUpRequest = gql`
    mutation SignUpRequest($user_id : ID!, $password: String!) {
        signUpRequest(user_id: $user_id, password: $password) {
            user_id
            password
            succeeded : Boolean
        }
    }
`
