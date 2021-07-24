import React from 'react'

import './Channels.css';
import { useHistory } from 'react-router-dom';


function Channels({image, title, id}) {
    const history = useHistory();

    const openChannel = () => {
        history.push(`/conversation/${id}`);
    };

    const openPrivateChat = () => {
        history.push(`/private/${id}`);
    }

    const openMenu = (e) => {
        ;
    };

    return image ? (
        <div className="channels" onClick={openPrivateChat} contextMenu={openMenu}>
            <img src={image} alt="x"/>
            <h3> { title }</h3>
        </div>
    ) : (
        <div className="channels" onClick={openChannel} contextMenu={openMenu}>
            <h3><span className="channels__hash">#</span> { title }</h3>
        </div>
    );
}

export default Channels
