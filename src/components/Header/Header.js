import React, { useState } from 'react';
import "./Header.css";
import Dropdown from '../Dropdown/Dropdown';

import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../StateProvider';

const StyledBadge = withStyles(() => ({
    badge: {
        background: '#4d134e',
        backgroundColor: '#007a5a',
        width: '14px',
        height: '14px',
        border: `2.5px solid #4d134e`,
        borderRadius: '50%',
    },
}))(Badge);

function Header() {
    const [{ user }] = useStateValue();
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => {
        setOpen(state => !state);
    }

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
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                <Avatar
                    onClick={toggleDropdown}
                    variant="rounded"
                    className="header__avatar"
                    src={user?.photoURL}
                    alt={user?.displayName}
                />
                </StyledBadge>
           </div>
           {open ? (
                <Dropdown image={user?.photoURL} altName={user?.displayName} />
            ) : null}
        </div>
    )
}

export default Header