import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import ChatHeader from '../ChatHeader/ChatHeader';
import Chat from '../Chat/Chat';
import ChatMessageInput from '../ChatMessageInput/ChatMessageInput';
import './Main.css';
import db from '../../firebase'

function Main({ user, channelType }) {
    const { roomId } = useParams();
    const [channelData, setChannelData] = useState(null);

    useEffect(() => {
        if (roomId) {
            db.collection(channelType)
            .doc(roomId)
            .onSnapshot(snapshot => setChannelData(snapshot.data()))
        }
    }, [roomId, channelType])

    return (
        <div className="main">
            {channelType === "private" ? (
                <ChatHeader user={user} type="private" data={channelData}/>
            ) : (
                <ChatHeader user={user} title={channelData?.name} members={channelData?.users}/>
            )}
            <Chat room={roomId} channelType={channelType}/>
            <ChatMessageInput channelName={channelData?.name} channelId={roomId} channelType={channelType}/>
        </div>
    )
}

export default Main
