import React from 'react'
import './ChatHeader.css';

import { makeStyles } from '@material-ui/core/styles';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

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

function ChatHeader({ user, title, type, data, members }) {
    const classes = useStyles();

    const partner = (user?.email === data?.from?.email ? (data?.to) : (data?.from));

    return (
        <div className="chatHeader">
            {type === "private" ? (
                <div className="chatHeader__left">
                    <Avatar 
                        className={classes.small} 
                        variant="rounded" 
                        src={partner?.image}
                        alt={partner?.name}
                    />
                    <h4>{partner?.name}</h4>
                    <StarOutlineIcon/>
                </div>
            ) : (
                <>
                <div className="chatHeader__left">
                    <h4>#</h4>
                    <h4>{title}</h4>
                    <StarOutlineIcon/>
                </div>
                <div className="chatHeader__right">
                    <AvatarGroup max={4}>
                        {members?.map(member => {
                            return <Avatar className={classes.small} variant="rounded" alt={member?.name} src={member?.image} />;
                        })}
                    </AvatarGroup>
                    <p>{members?.length}</p>
                </div>
                </>
            )}
        </div>
    )
}

export default ChatHeader
