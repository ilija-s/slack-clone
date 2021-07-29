/* eslint-disable no-unused-vars */
import React from 'react';
import './Dropdown.css';

import { Avatar } from '@material-ui/core';
import { auth } from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';

function Dropdown({ image, altName }) {
	const [state, dispatch] = useStateValue();
	const [{ user }] = useStateValue();

    const logout = () => {
        auth.signOut()
        .then(() => {
            dispatch({
                type: actionTypes.SET_USER,
                user: null
            })
        })
        .catch(error => {
            alert(error.message);
        });
    }

	return (
		<div className="dropdown">
			<div className="dropdown__info">
				<Avatar variant="rounded" alt={altName} src={image}/>
				<p>{altName}</p>
			</div>
			<hr></hr>
			<div className="dropdown__logout" onClick={logout}>
				<p>Sign out</p>
			</div>
		</div>	
	)
}

export default Dropdown
