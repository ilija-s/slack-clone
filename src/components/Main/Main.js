import React from 'react'

import ChatHeader from '../ChatHeader/ChatHeader';
import Chat from '../Chat/Chat';
import './Main.css';

function Main() {
    return (
        <div className="main">
            <ChatHeader/>
            <Chat/>
        </div>
    )
}

export default Main
