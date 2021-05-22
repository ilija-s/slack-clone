import React from 'react'
import "./Header.css"

import {Avatar} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../StateProvider';

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor',
        content: '""',
      },
    },
  }))(Badge);

function Header() {
    const [{ user }] = useStateValue();

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
                    variant="rounded"
                    className="header__avatar"
                    src={user?.photoURL}
                    alt={user?.displayName}/>
                </StyledBadge>
           </div>
        </div>
    )
}

export default Header