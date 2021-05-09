import React from 'react'
import "./Header.css"

import {Avatar} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <AccessTimeIcon/>
            </div>
            <div className="header__search">
                <input placeholder="Search"></input>
            </div>
            <div className="header__help">
                <HelpOutlineIcon />
            </div>
            <div className="header__right">
                {/* displays picture, status, on-click more options */}
                <Avatar
                    className="header__avatar"
                    alt={"Ilija"}/>
           </div>
        </div>
    )
}

export default Header