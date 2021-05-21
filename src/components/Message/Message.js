import React from 'react'
import './Message.css';

function Message({ message, timestamp, user, userImg }) {
    return (
        <div className="message">
            <img src={userImg} alt="A"/>
            <div className="message__main">
                <h4>
                    {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
