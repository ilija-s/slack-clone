import React from 'react'

import './Channels.css';
import { useHistory } from 'react-router-dom';


function Channels({title, id}) {
    const history = useHistory();

    const openChannel = () => {
        history.push(`/room/${id}`);
    };

    const openMenu = (e) => {
    };

    return (
        <div className="channels" onClick={openChannel} contextMenu={openMenu}>
            <h3><span className="channels__hash">#</span> {title}</h3>
        </div>
    )
}

export default Channels
