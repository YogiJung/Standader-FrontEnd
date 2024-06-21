import { CHAT_GENERATION } from "../../../Actions/MainActions/ChatAction/ChatAction";
import { ChatAction, ChatState } from "../../../StateTypes/MainStateTypes/ChatStateType/Chat";


const initial_state : ChatState = {
    chatRoomGenerated: false
}

const ChatReducer = (state = initial_state, action: ChatAction) => {
    switch(action.type) {
        case CHAT_GENERATION:
            return {
                ...state,
                chatRoomGenerated: action.payload,
            }
            
        default:
                return state
    }
}

export default ChatReducer