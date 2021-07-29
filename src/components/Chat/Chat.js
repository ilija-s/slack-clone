import React, { useState, useEffect, useRef } from 'react'

import './Chat.css';
import db from '../../firebase';
import Message from '../Message/Message';

function Chat({ room, channelType }) {
    const [channelMessages, setChannelMessages] = useState(null);
    const messagesEndRef = useRef(null)

    useEffect(() => {
        db.collection(channelType)
        .doc(room)
        .collection("chatRoom")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => setChannelMessages(
            snapshot.docs.map(doc => doc.data())
        ));
    }, [room, channelType]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }

    useEffect(() => {
        scrollToBottom();
    }, [channelMessages]);

    return (
        <div className="chat" ref={messagesEndRef}>
            {channelMessages?.map(({message, timestamp, user, userImg}) => {
                return <Message
                message = {message}
                timestamp = {timestamp}
                user = {user}
                userImg = {userImg}
                />
            })}
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default Chat
