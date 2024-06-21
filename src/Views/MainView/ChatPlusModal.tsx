import React, { useEffect, useId, useState } from "react";
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux";
import { chatGeneration } from "../../StateManage/Actions/MainActions/ChatAction/ChatAction";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ChatRoomGenerationRequest } from "../../GraphQuery/ChatQuery";
import { UUIDGenerator } from "../../Utils/MainUtils";
import { RootState } from "../../store";
export type ChatPlusModalProps = {
    isChatPlusModalOpen : boolean,
    friends_list : string[]
}
const ChatPlusModal : React.FC<ChatPlusModalProps> = (props : ChatPlusModalProps) => {
    const state = useSelector((state: RootState) => state)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    let isChatPlusModalOpen = props.isChatPlusModalOpen;
    let friends_list = props.friends_list;
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
    const [chatRoomGenerationRequest, {data, loading, error}] = useMutation(ChatRoomGenerationRequest)
    const toggleFriendSelection = (friend: string) => {
        setSelectedFriends((current) =>
        current.includes(friend)
        ? current.filter((name) => name !== friend)
        : [...current, friend]
        );
    };
    const ChatGenerate =  async () => {
        try {
            const uuid = UUIDGenerator()
            selectedFriends.push(state.loginReducer.userInfo.user_id)
            await chatRoomGenerationRequest({
                variables: {
                    room_id : uuid,
                    participated_users: selectedFriends,
                }
            })
        } catch (error) {
            console.log("Chat Generation Error", error)
        }
    }
    useEffect(() => {
        if (error) {
            console.error(error)
        }
        
        if (data != null) {
            dispatch(chatGeneration(true))
        }
        
    }, [data, error])
    return (
        <Modal isOpen={isChatPlusModalOpen} style={ChatPlusModalDesign}>
            <div style={{display:"flex" ,
                        justifyContent :"space-between"
                    }}>
                <h2>Create ChatRoom</h2>
                <div style={selectedFriends.length !== 0 ? ChatPlusModalButtonDesign_active : ChatPlusModalButtonDesign_inactive} onClick={ChatGenerate}>

                </div>
            </div>
            <div>
                {friends_list.map((friend, index) => (
                    <div key={index} style={ selectedFriends.includes(friend) ? ChatPlusModalFriendListContainer_active : ChatPlusModalFriendListContainer_inactive} onClick={() => toggleFriendSelection(friend)}>
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: '1rem 0',
                        }}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                        >
                        <span style={{ textAlign: "left" }}>{friend}</span>
                    </div>
                    <div style={ChatPlusModalDividerContainer}>
                        <div style={ChatPlusModalDivider}/>
                    </div>
                </div>
                ))}
            </div>
        </Modal>
    )
}

const ChatPlusModalDesign : ReactModal.Styles = {

    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '20vw',
        height: '50vh',
        borderRadius: "25px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    },
}

const ChatPlusModalButtonDesign_active  : React.CSSProperties = {
    backgroundImage: `url("/Assets/UI/check.svg")`,
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundSize: 'cover',
    marginTop: '2.6rem',
    marginRight: '1rem',
    opacity: 1.0,
    cursor: "pointer",
};
const ChatPlusModalButtonDesign_inactive  : React.CSSProperties = {
    backgroundImage: `url("/Assets/UI/check.svg")`,
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundSize: 'cover',
    marginTop: '2.6rem',
    marginRight: '1rem',
    opacity: 0.3,
};

  
const ChatPlusModalFriendListContainer_inactive : React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: 'start',
    cursor: "pointer",
}

const ChatPlusModalFriendListContainer_active: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: 'start',
    backgroundColor: "#E0E0E0",
    opacity: 1, 
    cursor: "pointer",
    borderRadius: '4px', 
};


const ChatPlusModalDividerContainer : React.CSSProperties = {
    width: "100%",
    height: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

}
const ChatPlusModalDivider : React.CSSProperties = {
    width: "30%", 
    border: "0.3px solid black",
}

export default ChatPlusModal;