//Commonly initial state, Common Action
import { CHAT_GENERATION } from "../../../Actions/MainActions/ChatAction/ChatAction"

interface ChatAction {
    type: CHAT_GENERATION,
    payload: any
}

interface ChatState {
    chatRoomGenerated: Boolean;
}


//Action ==> Client Layer
//StateManager ==> Medium
//Reducer ==> Store Layer