import React, { Component } from 'react';

class Channels extends Component {
	render() {
		return (
			<div>
				<div className="friends" style={{ height: '8vh', width: '100%' }}>
					<div className="d-flex align-items-center pl-2" style={{ height: '80%', width: '90%' }}>
						<div style={{ width: '50%', height: '100%' }} className="d-flex align-items-center">
							<p className="friendstext">Text Channels</p>
						</div>
					</div>
				</div>
				<div className="d-flex">
					<div style={{ width: '100%', height: '100%' }} className="d-flex align-items-center">
						<div className="notification mr-2" />
						<div
							className="friendsbox d-flex align-items-center"
							style={{ height: '100%', borderRadius: '2px', width: '90%' }}
						>
							<div className="d-flex align-items-center ml-2">
								<span className="mr-1 font-italic pr-2" style={{ fontSize: '1.8em', color: '#8e9297' }}>
									#
								</span>
								<p className="text-light mb-0">ChannelName</p>
							</div>
						</div>
					</div>
				</div>
				<div className="friends" style={{ height: '8vh', width: '100%' }}>
					<div className="d-flex align-items-center pl-2" style={{ height: '80%', width: '90%' }}>
						<div style={{ width: '50%', height: '100%' }} className="d-flex align-items-center">
							<p className="friendstext">Audio Channels</p>
						</div>
					</div>
				</div>
				<div className="d-flex">
					<div style={{ width: '100%', height: '100%' }} className="d-flex align-items-center">
						<div className="notification mr-2" />
						<div
							className="friendsbox d-flex align-items-center"
							style={{ height: '100%', borderRadius: '2px', width: '90%' }}
						>
							<div className="d-flex align-items-center ml-2">
								<div className="options d-flex justify-content-center align-items-center not-option">
									<img src="./assets/image/unmute.png" alt="sp1" className="img-fluid" />
								</div>
								<p className="text-light mb-0">ChannelName</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Channels;
