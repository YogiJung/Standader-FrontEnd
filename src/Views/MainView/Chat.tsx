import React, { useEffect, useState } from "react";
import styles from "../../CssModule/MainViewCss/Chat.module.scss";
import { UUIDGenerator } from "../../Utils/MainUtils";
import { Link } from "react-router-dom";
import ChatPlusModal, {ChatPlusModalProps} from "./ChatPlusModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMutation } from "@apollo/client";
import { ChatRoomFetchRequest } from "../../GraphQuery/ChatQuery";

function Chat() {
    const state = useSelector((state : RootState) => state)
    const [chatRoomList, setChatRoomList] = useState<string[]>([])
    const [isChatPlusModalOpen, setChatPlusModalOpen] = useState(false);
    const [chatRoomFetchRequest, {data, error, loading}] = useMutation(ChatRoomFetchRequest)
    const test_freinds_list = ["tortrex8@gmail.com", "yogiphilipos2@gmail.com"];
    const modal_props : ChatPlusModalProps = {
        isChatPlusModalOpen : isChatPlusModalOpen,
        friends_list : test_freinds_list
    }
    const scroller = () => {
        window.scrollTo(0,0)
        console.log("scrolled");
    }
    const chatRoomFetch = async () => {
        await chatRoomFetchRequest( {
            variables: {
                user_id : test_freinds_list[0]
            }
        })
    }
    useEffect(() => {
        chatRoomFetch()
        scroller()
    }, [])
    useEffect( () => {
        if (data != null && data.chatRoomFetchRequest.succeeded == true) {
            console.log(data)
            setChatRoomList(data.chatRoomFetchRequest.participated_chat_rooms)
        }
    }, [data])
    useEffect(() => {
        if (state.chatReducer.chatRoomGenerated) {
            setChatPlusModalOpen(false)
        }
    }, [state.chatReducer.chatRoomGenerated])

    const chatPlusModalOpen = () => {
        setChatPlusModalOpen(true)
    }
    
    return (
        
        <div className={styles.container}>
            <div className={styles.header_left}></div>
            <div className={styles.header_center}>
                <div className={styles.chat_plus_container}>
                    <div className={styles.chat_plus_design} onClick={chatPlusModalOpen}/>
                    {isChatPlusModalOpen && <ChatPlusModal {...modal_props} />}
                </div>
                <div className={styles.divider}></div>
            </div>
            <div className={styles.header_right}></div>

            <div className={styles.main_left}>
            </div>
            <div className={styles.main_center}>
                {chatRoomList && chatRoomList.map((chatRoom,index) => (
                    <div key={index} className={styles.chatroom_container}>
                        <Link to={`${chatRoom}`}>
                            <div className={styles.chatroom_design}>
                                <div className={styles.chatroom_logo_container}>
                                    <div className={styles.chatroom_logo}>
                                    </div>
                                </div>
                                <div className={styles.divider}></div>
                                <div className={styles.chat_preview_container}> 
                                    <p>{chatRoom}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.main_right}></div>
        </div>
    )
}


export default Chat;

