import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from './Home';
import Servers from './Servers';
import DirectMessage from './DirectMessage';
import User from './User';
import DMChat from './DMChat';
import FriendsStatus from './FriendsStatus';

import Chat from './Chat';

class Dashboard extends Component {
	componentDidUpdate() {
		if (this.props.currentView.view === 'default') {
			document.title = 'Chat.io';
		} else if (this.props.currentView.view === 'server') {
			document.title = '#ChannelName';
		} else {
			document.title = '@Username';
		}
	}
	componentDidMount() {
		if (this.props.currentView.view === 'default') {
			document.title = 'Chat.io';
		} else if (this.props.currentView.view === 'server') {
			document.title = '#ChannelName';
		} else {
			document.title = '@Username';
		}
		if (this.props.currentView.view === 'default') {
			document.title = 'Chat.io';
		}
		[ ...document.getElementsByClassName('options') ].forEach((option) => {
			option.addEventListener('click', function() {
				let audio;
				if (this.children[0].src.includes('unmute')) {
					let handler = (stream) => {
						this.children[0].src = this.children[0].src.replace('unmute', 'mute');
						stream.getTracks().forEach((track) => {
							track.stop();
						});
						console.log('Mic off');
					};
					handler = handler.bind(this);
					audio = new Audio('./assets/sound/unselect.mp3');
					navigator.mediaDevices.getUserMedia({ audio: true }).then(handler).catch((err) => {
						console.log(err);
					});
				} else if (this.children[0].src.includes('mute')) {
					let handler = () => {
						this.children[0].src = this.children[0].src.replace('mute', 'unmute');
						console.log('Mic on');
					};
					handler = handler.bind(this);
					audio = new Audio('./assets/sound/select.mp3');
					navigator.mediaDevices.getUserMedia({ audio: true }).then(handler).catch((err) => {
						console.log(err);
					});
				} else if (this.children[0].src.includes('headphones-on')) {
					audio = new Audio('./assets/sound/select.mp3');
					this.children[0].src = this.children[0].src.replace('headphones-on', 'headphones-off');
				} else if (this.children[0].src.includes('headphones-off')) {
					audio = new Audio('./assets/sound/unselect.mp3');
					this.children[0].src = this.children[0].src.replace('headphones-off', 'headphones-on');
				}
				audio.play();
			});
		});
		[ ...document.getElementsByClassName('server') ].forEach((server) => {
			server.addEventListener('mouseover', serverHoverInHandler);
			server.addEventListener('mouseout', serverHoverOutHandler);
			server.addEventListener('click', function() {
				let selected = document.getElementsByClassName('notification-selected')[0];
				selected.nextElementSibling.addEventListener('mouseover', serverHoverInHandler);
				selected.nextElementSibling.addEventListener('mouseout', serverHoverOutHandler);
				selected.classList.remove('notification');
				selected.classList.remove('notification-selected');
				selected.classList.add('notification-none');
				this.removeEventListener('mouseover', serverHoverInHandler);
				this.removeEventListener('mouseout', serverHoverOutHandler);
				if (this.previousElementSibling) {
					this.previousElementSibling.classList.remove('notification-hover');
					this.previousElementSibling.classList.remove('notification-none');
					this.previousElementSibling.classList.add('notification');
					this.previousElementSibling.classList.add('notification-selected');
				} else {
					this.parentElement.previousElementSibling.classList.remove('notification-hover');
					this.parentElement.previousElementSibling.classList.remove('notification-none');
					this.parentElement.previousElementSibling.classList.add('notification');
					this.parentElement.previousElementSibling.classList.add('notification-selected');
				}
			});
		});
		function serverHoverInHandler() {
			if (this.previousElementSibling) {
				this.previousElementSibling.classList.add('notification-hover');
				if (this.previousElementSibling.className.includes('notification-none')) {
					this.previousElementSibling.classList.add('notification-hover');
				}
			}
		}
		function serverHoverOutHandler() {
			if (this.previousElementSibling) {
				this.previousElementSibling.classList.remove('notification-hover');
			}
		}
	}
	render() {
		const { view } = this.props.currentView;
		return (
			<div className="wrapper">
				<div className="servers-home-wrapper">
					<Home />
					<Servers />
				</div>
				<div className="dm-channels-wrapper" style={{ position: 'absolute', left: '5.5rem', top: '0' }}>
					<DirectMessage />
					<User />
				</div>
				<div className="chat-dm-friends-wrapper">
					{view === 'default' ? <FriendsStatus /> : view === 'server' ? <Chat /> : <DMChat />}
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	currentView: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	currentView: state.currentView
});

export default connect(mapStateToProps)(Dashboard);
