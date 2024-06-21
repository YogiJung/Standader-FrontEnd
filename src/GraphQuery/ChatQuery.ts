import {gql} from '@apollo/client'

export const ChatRoomGenerationRequest = gql`
    mutation ChatRoomGenerationRequest($room_id: String!, $participated_users: [String]!) {
        chatRoomGenerationRequest(room_id : $room_id, participated_users : $participated_users) {
            succeeded
        }
    }`

export const ChatRoomFetchRequest = gql`
    mutation ChatRoomFetchRequest($user_id : ID!) {
        chatRoomFetchRequest(user_id : $user_id) {
            participated_chat_rooms
            succeeded
        }
    }`

type participated_chat_rooms = [String]

export const ChatRoomReEnterRequest = gql`
        mutation ChatRoomReEnterRequest($room_id : String!) {
            chatRoomReEnterRequest(room_id : $room_id) {
                message_info
                succeeded
            }
        }`

export type message_info = {
    sender: String,
    content: String,
    timeStamp : String
}

