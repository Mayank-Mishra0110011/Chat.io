import React, { Component } from 'react';
import DMChat from './DMChat';

class Chat extends Component {
	render() {
		return (
			<div>
				<div className="server-chat-wrapper" style={{ position: 'absolute', top: '0', overflowX: 'auto' }}>
					<DMChat />
				</div>
				<div className="server-member-wrapper" style={{ position: 'absolute', left: '47rem', top: '0' }} />
			</div>
		);
	}
}

export default Chat;
