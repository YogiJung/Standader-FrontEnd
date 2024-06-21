import React, { useEffect, useRef, useState } from "react";
import { UUIDGenerator } from "../../Utils/MainUtils";
import { useParams } from "react-router-dom";
import styles from "../../CssModule//MainViewCss/ChatRoom.module.scss"
import classNames from "classnames/bind"; //조건부 렌더링 시 classnames/bind로 가져와야 함 무조건
import { ChatRoomReEnterRequest } from "../../GraphQuery/ChatQuery";
import { useMutation } from "@apollo/client";
import { APPLICATION_JSON, Encodable, IdentitySerializer, JsonSerializer, MESSAGE_RSOCKET_COMPOSITE_METADATA, WellKnownMimeType, encodeCompositeMetadata } from "rsocket-core";
import { ReactiveSocket } from 'rsocket-types'
import { Flowable } from "rsocket-flowable";
import { RSocketClient } from "rsocket-core";
import WebSocketTransport from "rsocket-websocket-client";
import { ClientOptions } from "rsocket-websocket-client/RSocketWebSocketClient";
import RSocketWebSocketClient from 'rsocket-websocket-client';
import { Payload } from 'rsocket-types';
import { rSocketChannel, rSocketRequestResponse, rSocketChannel2, rSocketStream } from "../../Utils/RSocketUtils";
import { wssUrl } from "../../Utils/RSocketUtils";
import { BufferEncoders, encodeRoute, MESSAGE_RSOCKET_ROUTING } from 'rsocket-core';
import { subscribe } from "diagnostics_channel";
import { rsocketStreamManager } from "../../Utils/RSocketUtils";

function ChatRoom () {
    let { chatRoomId } = useParams();
    const [messageContents, setMessageContent] = useState<string[]>([]);
    const cs = classNames.bind(styles);
    const [isMyChat, setMyChat] = useState<boolean>(false);
    const [message, setMessage] = useState("");
    const [chatRoomReEnterRequest, {data, loading, error}] = useMutation(ChatRoomReEnterRequest);
    const clientRef = useRef<RSocketClient<Encodable, Encodable> | null>(null);
    const managerRef = useRef<rsocketStreamManager | null>(null);
    const socketRef = useRef<ReactiveSocket<Encodable, Encodable> | null>(null);

    const chatReEnter = async () => {
        try {
            console.log(chatRoomId)
            await chatRoomReEnterRequest({
                variables: {
                    room_id : chatRoomId
                }
            })
        } catch(e) {
            console.error("Chat ReEnter Error")
        }
    }
    
      
    useEffect(() => {
        chatReEnter()
        const client = new RSocketClient({
            transport: new RSocketWebSocketClient({url: wssUrl, debug: true}, BufferEncoders),
            setup: {
              keepAlive: 18000,
              lifetime: 60000,
              dataMimeType: APPLICATION_JSON.string,
              metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
              payload: {
                metadata: encodeCompositeMetadata([
                  [MESSAGE_RSOCKET_ROUTING, encodeRoute(`setup.${chatRoomId}`)],
                ])
              }
            },
            serializers: {
              data: IdentitySerializer,
              metadata: IdentitySerializer
            }
        })
        clientRef.current = client

        const manager = new rsocketStreamManager(wssUrl, chatRoomId as string, 10, setMessageContent, clientRef.current)
        console.log("rendered")
        managerRef.current = manager
        managerRef.current.rSocketStream(false, socketRef)

    }, [])



    useEffect(() => {

        //무조건 null 체크 해줘야 함.
        if (data != null && data.chatRoomReEnterRequest.succeeded) {
            data.chatRoomReEnterRequest.message_info.map((message : string) => {
                const message_obj = JSON.parse(message);
                setMessageContent((prevState) => [...prevState, message_obj.payload])
            })
        }
    }, [data, error])

    const judgeMyChat = () => {
        if ("") {
        setMyChat(true)
        } else {
        setMyChat(false)
        }
    }
    const onChatChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }
    const onChatSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!message.trim()) return;
        // rSocketStream(wssUrl, chatRoomId as string, message.trim(), false, 3, setMessageContent)
        if (socketRef.current) {
            managerRef.current?.rSocketSendMessage(socketRef.current,message.trim(), false)
        } else {
            console.error("message sent Error")
        }
        
        // rSocketRequestResponse(wssUrl)
        setMessage("")
    }
    const onChatFormSubmit = (event : React.FormEvent) => {
        event.preventDefault();
        onChatSubmit(event)

    }
    return (
        <div className={styles.container}>
            <div className={styles.header_left}></div>
            <div className={styles.header_center}></div>
            <div className={styles.header_right}></div>
            <div className={styles.main_left}></div>
            <div className={styles.main_center}>
                <div className={styles.message_content_container}>
                    {messageContents && messageContents.map((message, index) => (
                        <div key={index} className={styles.message_conent}>
                            <div className={cs(isMyChat ? 'message_my_chat' : 'message_other_chat')}>  
                                <p>{message} {isMyChat}</p>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={styles.chat_input_container}>
                    <form className={styles.chat_form_container} onSubmit={onChatFormSubmit}>
                        <input type="text" className={styles.chat_input} value={message} onChange={onChatChange} placeholder="message..."/>
                        <input type="button" value={"Submit"} onClick={onChatSubmit}></input>
                    </form>
                </div>
            </div>
            <div className={styles.main_right}></div>

        </div>
    )
}


export default ChatRoom