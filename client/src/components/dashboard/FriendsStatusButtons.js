import React, { Component } from 'react';

class FriendsStatusButtons extends Component {
	render() {
		return (
			<div className="friend-status-options d-flex align-items-center">
				<div style={{ width: '100%', height: '80%', borderBottom: '1px solid #2a2c31' }}>
					<div style={{ width: '60rem', height: '100%', position: 'relative' }}>
						<div style={{ width: '10rem', height: '100%' }} className="d-flex">
							<div
								style={{ width: '20%', height: '100%' }}
								className="d-flex justify-content-start align-items-center ml-2"
							>
								<img
									src="./assets/image/friends2.png"
									className="img-fluid"
									style={{ maxHeight: '60%' }}
									id="friendsicon"
									alt="friendsicon"
								/>
							</div>
							<div
								style={{ width: '70%', height: '100%' }}
								className="d-flex justify-content-center align-items-center"
							>
								<p className="text-light mb-0">Friends</p>
								<div
									style={{ width: '1px', height: '70%', backgroundColor: '#8e9297' }}
									className="ml-5"
								/>
							</div>
						</div>
						<div
							style={{
								width: '10rem',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '10rem'
							}}
							className="d-flex justify-content-center align-items-center py-1"
						>
							<div className="friend-option d-flex justify-content-center align-items-center">
								<p className="friendstext">Online</p>
							</div>
						</div>
						<div
							style={{
								width: '10rem',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '20rem'
							}}
							className="d-flex justify-content-center align-items-center py-1"
						>
							<div className="friend-option foactive d-flex justify-content-center align-items-center">
								<p className="friendstext">All</p>
							</div>
						</div>
						<div
							style={{
								width: '10rem',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '30rem'
							}}
							className="d-flex justify-content-center align-items-center py-1"
						>
							<div className="friend-option d-flex justify-content-center align-items-center">
								<p className="friendstext">Pending</p>
							</div>
						</div>
						<div
							style={{
								width: '10rem',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '40rem'
							}}
							className="d-flex justify-content-center align-items-center py-1"
						>
							<div className="friend-option d-flex justify-content-center align-items-center">
								<p className="friendstext">Blocked</p>
							</div>
						</div>
						<div
							style={{
								width: '10rem',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '50rem'
							}}
							className="d-flex justify-content-center align-items-center py-1"
						>
							<div
								id="addFriend"
								className="d-flex justify-content-center align-items-center"
								style={{ backgroundColor: 'rgb(67, 181, 129)' }}
							>
								<p className="text-light mb-0">Add Friend</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FriendsStatusButtons;
