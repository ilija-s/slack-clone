import React from 'react';
import './SidebarDropdown.css';

import { Avatar } from '@material-ui/core';

function SidebarDropdown({ altName }) {
	return (
		<div className="sbdropdown">
			<div className="sbdropdown__header">
				<Avatar variant="rounded" alt={altName} />
				<p>{altName}</p>
			</div>
			<hr></hr>
			<div className="sbdropdown__info">
				<p>Invite people to {altName}</p>
				<p>Create a channel</p>
			</div>
		</div>
	)
}

export default SidebarDropdown
