import React from 'react';
import { useState, useEffect } from 'react';
import './Sidebar.css';
import db from '../firebase';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Channels from './Channels';

function Sidebar() {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection("channels").onSnapshot((snapshot) => { 
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                }))
            )
        });
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__header__dropdown">
                    <h2>test</h2>
                    <KeyboardArrowDownIcon/>
                </div>
                <button><CreateIcon/></button>
            </div>
            <div className="sidebar__browse">
                <MoreVertIcon/>
                <h3>Browse Slack</h3>
            </div>
            {channels.map((channel) => {
                <Channels title={channel.name} id={channel.id}/>
            })}
        </div>
    )
}

export default Sidebar