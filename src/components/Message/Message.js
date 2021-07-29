import React from 'react'
import './Message.css';
import moment from 'moment';

function Message({ message, timestamp, user, userImg }) {
    let messageDate = new Date(timestamp?.toDate()).toUTCString();
    const formattedDate = moment(messageDate).calendar();
    return (
        <div className="message">
            <img src={userImg} alt="A"/>
            <div className="message__main">
                <h4>
                    {user} <span>{formattedDate}</span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
