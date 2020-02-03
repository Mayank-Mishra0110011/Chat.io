import React, { Component } from 'react';
import FriendsStatusButtons from './FriendsStatusButtons';
import FriendsStatusHeader from './FriendsStatusHeader';
import FriendsStatusContent from './FriendsStatusContent';

class FriendsStatus extends Component {
	render() {
		return (
			<div>
				<FriendsStatusButtons />
				<FriendsStatusHeader />
				<FriendsStatusContent />
			</div>
		);
	}
}

export default FriendsStatus;
