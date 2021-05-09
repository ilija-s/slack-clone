import React from 'react'

import './Channels.css';


function Channels({title}) {
    return (
        <div className="channels">
            <h3><span className="channels__hash">#</span> {title}</h3>
        </div>
    )
}

export default Channels
