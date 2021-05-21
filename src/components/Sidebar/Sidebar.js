import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import db from '../../firebase';
import Channels from '../Channels/Channels';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';

function Sidebar() {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection("channels").onSnapshot((snapshot) => { 
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }))
            )
        });
    }, []);

    const addChannel = () => {
        const channelName = prompt('Create a channel');

        if (channelName) {
            db.collection("channels").add({
                name: channelName
            });
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__header__dropdown">
                    <h2>test</h2>
                    <KeyboardArrowDownIcon/>
                </div>
                <button><CreateIcon className="sidebar__header__createIcon"/></button>
            </div>
            <div className="sidebar__browse">
                <MoreVertIcon/>
                <h3>Browse Slack</h3>
            </div>
            <div className="sidebar__showmore">
                <div className="sidebar__showmore__channels">
                    <ArrowDropDownIcon /> 
                    <h3>Channels</h3>
                </div>
                <button onClick={addChannel}><AddIcon/></button>
            </div>
            {channels.map((channel) => {
                return <Channels title={channel.name} id={channel.id}/>
            })}
        </div>
    )
}

export default Sidebar