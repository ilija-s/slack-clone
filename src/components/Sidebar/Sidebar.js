import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import db from '../../firebase';
import Channels from '../Channels/Channels';
import { useStateValue } from '../../StateProvider';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [privateMessages, setPrivateMessages] = useState([]);

    const [{ user }] = useStateValue();

    console.log(user);

    // XXX: need to fix for getting the right channel rooms
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

    useEffect(() => {
        db.collection("private")
        .where("users", "array-contains", user?.email)
        .onSnapshot((snapshot) => { 
            setPrivateMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    from: doc.data().from,
                    to: doc.data().to,
                    image: user?.photoURL,
                }))
            )
        });
    }, [user]);

    const addChannel = () => {
        const channelName = prompt('Create a channel');

        if (channelName) {
            db.collection("channels").add({
                name: channelName
            });
        }
    }

    const addDirectMessage = () => {
        const userEmail = prompt('Enter email of a user')

        const alreadyExists = privateMessages.filter((room) => {return room.to === userEmail}).length > 0;

        if (userEmail && !alreadyExists) {
            db.collection("private").add({
                from: user?.email,
                to: userEmail,
                users: [user?.email, userEmail],
            })
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
                <h3>More</h3>
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

            <div className="sidebar__showmore">
                <div className="sidebar__showmore__channels">
                    <ArrowDropDownIcon /> 
                    <h3>Direct messages</h3>
                </div>
                <button onClick={addDirectMessage}><AddIcon/></button>
            </div>
            {privateMessages.map((privateMessage) => {
                return <Channels image={privateMessage.image} title={privateMessage.to} id={privateMessage.id}/>
            })}
        </div>
    )
}

export default Sidebar