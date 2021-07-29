import React, { useState } from 'react'
import './ChatMessageInput.css';
import db from "../../firebase";
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';

function ChatMessageInput({ channelName, channelId, channelType }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId) {
            db.collection(channelType)
            .doc(channelId)
            .collection("chatRoom")
            .add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user?.displayName,
                userImg: user?.photoURL 
            })
        }

        setInput("");
    };

    return (
        <div className="chatMessageInput">
            <form>
                <input 
                autoFocus
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Send a message to #${channelName?.toLowerCase()}`}
                />
                <button type="submit" onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default ChatMessageInput
