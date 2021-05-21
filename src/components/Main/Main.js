import React, { useEffect, useState } from 'react'

import ChatHeader from '../ChatHeader/ChatHeader';
import Chat from '../Chat/Chat';
import './Main.css';
import { useParams } from 'react-router-dom';
import db from '../../firebase'

function Main() {
    const { roomId } = useParams();
    const [channelData, setChannelData] = useState(null);

    useEffect(() => {
        if (roomId) {
            db.collection('channels')
            .doc(roomId)
            .onSnapshot(snapshot => setChannelData(snapshot.data()))
        }
    }, [roomId])

    return (
        <div className="main">
            <ChatHeader title={channelData?.name}/>
            <Chat room={roomId}/>
        </div>
    )
}

export default Main
