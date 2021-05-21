import React, { useState, useEffect } from 'react'

import './Chat.css';
import db from '../../firebase';
import Message from '../Message/Message';

function Chat({ room }) {
    const [channelMessages, setChannelMessages] = useState(null);

    useEffect(() => {
        db.collection("channels")
        .doc(room)
        .collection("chatRoom")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => setChannelMessages(
            snapshot.docs.map(doc => doc.data())
        ))
    }, [room]);

    console.log(channelMessages);

    return (
        <div className="chat">
            {channelMessages?.map(({message, timestamp, user, userImg}) => {
                return <Message
                message = {message}
                timestamp = {timestamp}
                user = {user}
                userImg = {userImg}
                />
            })}
        </div>
    )
}

export default Chat
