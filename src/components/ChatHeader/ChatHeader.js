import React from 'react'

import './ChatHeader.css';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function ChatHeader({ title }) {
    return (
        <div className="chatHeader">
            <div className="chatHeader__left">
                <h4>#</h4>
                <h4>{title}</h4>
                <StarOutlineIcon/>
            </div>
            <div className="chatHeader__right">
                <h4>members</h4>
                <InfoOutlinedIcon/>
            </div>
        </div>
    )
}

export default ChatHeader
