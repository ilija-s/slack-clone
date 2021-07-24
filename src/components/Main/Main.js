import React, { useEffect, useState } from 'react'

import ChatHeader from '../ChatHeader/ChatHeader';
import Chat from '../Chat/Chat';
import ChatMessageInput from '../ChatMessageInput/ChatMessageInput';
import './Main.css';
import { useParams } from 'react-router-dom';
import db from '../../firebase'

function Main({ channelType }) {
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
            <ChatHeader title={channelData?.name}/>
            <Chat room={roomId} channelType={channelType}/>
            <ChatMessageInput channelName={channelData?.name} channelId={roomId} channelType={channelType}/>
        </div>
    )
}

export default Main
