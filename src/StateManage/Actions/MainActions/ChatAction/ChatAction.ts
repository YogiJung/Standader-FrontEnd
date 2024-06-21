//Action State Reducer


export const CHAT_GENERATION = "CHAT_GENERATION"

export const chatGeneration = (chatRoomGenerated : Boolean) => ({
    type: CHAT_GENERATION,
    payload: chatRoomGenerated,
})

