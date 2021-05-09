import React from 'react'

import './ChatHeader.css';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InfoIcon from '@material-ui/icons/Info';

function ChatHeader() {
    return (
        <div className="chatHeader">
            <div className="chatHeader__left">
                <h4>#</h4>
                <h4>Channel name</h4>
                <StarOutlineIcon/>
            </div>
            <div className="chatHeader__right">
                <h4>members</h4>
                <InfoIcon/>
            </div>
        </div>
    )
}

export default ChatHeader
