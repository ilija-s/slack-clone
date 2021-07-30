import React, { useState, useEffect } from 'react';
import './Channels.css';
import db from '../../firebase';

import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const StyledBadge = withStyles(() => ({
    badge: {
        backgroundColor: '#007a5a',
        border: `2px solid #4d134e`,
        width: '11px',
        height: '11px',
        borderRadius: '50%',
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            content: '""',
        },
    },
}))(Badge);

function Channels({ image, title, id, partnerId}) {
    const history = useHistory();
    const classes = useStyles();
    const [active, setActive] = useState(false);

    if (partnerId) {
        useEffect(() => {
            db.collection('users').doc(partnerId).onSnapshot((snapshot) => {
                setActive(snapshot.data().isActive);
            });
        }, []);
    }

    const openChannel = () => {
        history.push(`/conversation/${id}`);
    };

    const openPrivateChat = () => {
        history.push(`/private/${id}`);
    }

    return partnerId ? (
        <div className="channels" onClick={openPrivateChat}>
            <StyledBadge
                invisible={!active}
                overlap="circular"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
            <Avatar 
                className={classes.small} 
                variant="rounded" 
                src={image} 
                alt=""
            />
            </StyledBadge>
            <h3> {title}</h3>
        </div>
    ) : (
        <div className="channels" onClick={openChannel}>
            <h3><span className="channels__hash">#</span> { title }</h3>
        </div>
    );
}

export default Channels
