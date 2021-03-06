import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import db from '../../firebase';
import Channels from '../Channels/Channels';
import SidebarDropdown from '../Dropdown/SidebarDropdown';
import { useStateValue } from '../../StateProvider';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [privateMessages, setPrivateMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const [openChannels, setOpenChannels] = useState(true);
    const [openPrivate, setOpenPrivate] = useState(true);

    const [{ user }] = useStateValue();

    // XXX: need to fix for getting the right channel rooms
    useEffect(() => {
        db.collection("channels")
        .onSnapshot((snapshot) => { 
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    users: doc.data().users,
                }))
            )
        });
    }, []);

    // finds all private chats where current user is present and updates privateMessages
    useEffect(() => {
        db.collection("private")
        .where("users", "array-contains", user?.email)
        .onSnapshot((snapshot) => { 
            setPrivateMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    partner: (user.email === doc.data().from.email ? (doc.data().to) : (doc.data().from)),
                    receiverName: doc.data().to.name,
                }))
            )
        });
    }, [user]);

    const addChannel = () => {
        const channelName = prompt('Create a channel');

        if (channelName) {
            db.collection('users')
            .get()
            .then(allUsers => {
                let userArray = [];
                let channelOwner = null;

                allUsers.forEach((usr) => {
                    if (usr.data().email === user.email)
                        channelOwner = usr.data();
                    userArray.push(Object.assign({}, usr.data()))
                });

                db.collection("channels").add({
                    owner: channelOwner,
                    name: channelName,
                    users: userArray,
                })
            })
            .catch(error => {
                alert(error.message);
            });
        }
    }

    function displayDropdown() {
        setOpen(state => !state);
    }

    function displayChannels() {
        setOpenChannels(state => !state);
    }

    function displayPrivate() {
        setOpenPrivate(state => !state);
    }

    function getUserByEmail(email) {
        return db.collection('users')
        .where('email', '==', email)
        .get()
        .then(data => {
            if (data) {
                return data?.docs[0].data();
            } else {
                console.log("User with that email doesn't exist!");
            }
        })
        .catch((error) => {
            console.log('Error getting user by email: ', error);
        });
    }

    const addDirectMessage = () => {
        const userEmail = prompt('Enter email of a user');

        let newUser = {};
        let userReceiver = null;

        getUserByEmail(userEmail).then(usr => {
            userReceiver = usr;

            newUser = {
                email: user.email,
                id: user.uid,
                image: user.photoURL,
                name: user.displayName
            }

            const alreadyExists = privateMessages.filter((room) => {
                return room.uid === userReceiver?.id;
            }).length > 0;

            if (userEmail && !alreadyExists) {
                db.collection("private").add({
                    from: Object.assign({}, newUser),
                    to: Object.assign({}, userReceiver),
                    users: [user?.email, userEmail],
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div onClick={displayDropdown} className="sidebar__header__dropdown">
                    <h2>test</h2>
                    <KeyboardArrowDownIcon/>
                </div>
                <button><CreateIcon className="sidebar__header__createIcon"/></button>
            </div>
            {open ? (
                <SidebarDropdown altName="Test"/>
            ) : null}

            <div className="sidebar__browse">
                <MoreVertIcon/>
                <h3>More</h3>
            </div>

            <div className="sidebar__showmore">
                <div onClick={displayChannels} className="sidebar__showmore__channels">
                    {openChannels ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    <h3>Channels</h3>
                </div>
                <button onClick={addChannel}><AddIcon/></button>
            </div>
            {openChannels ? (
                channels.map((channel) => {
                    return <Channels title={channel.name} id={channel.id}/>
                })
            ) : null}

            <div className="sidebar__showmore">
                <div onClick={displayPrivate} className="sidebar__showmore__channels">
                    {openPrivate ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    <h3>Direct messages</h3>
                </div>
                <button onClick={addDirectMessage}><AddIcon/></button>
            </div>
            {openPrivate ? (
                privateMessages.map((privateMessage) => {
                    return <Channels partnerId={privateMessage.partner.id} image={privateMessage.partner.image} title={privateMessage.partner.name} id={privateMessage.id}/>
                })
            ) : null}
        </div>
    )
}

export default Sidebar