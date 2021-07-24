import React, { useState, useEffect } from 'react'

import './Chat.css';
import db from '../../firebase';
import Message from '../Message/Message';

function Chat({ room, channelType }) {
    const [channelMessages, setChannelMessages] = useState(null);

    // XXX: make channelType compatible with being passed inside collection method
    useEffect(() => {
        db.collection(channelType)
        .doc(room)
        .collection("chatRoom")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => setChannelMessages(
            snapshot.docs.map(doc => doc.data())
        ))
    }, [room, channelType]);

    // XXX: use some kind of if-else if there are no messages
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
