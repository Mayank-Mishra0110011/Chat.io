import React, { Component } from 'react';

class FriendsStatusHeader extends Component {
	componentDidMount() {
		[ ...document.getElementsByClassName('friend-option') ].forEach((option) => {
			option.addEventListener('click', function() {
				let active = document.getElementsByClassName('foactive')[0];
				active.classList.remove('foactive');
				this.classList.add('foactive');
			});
		});
	}
	render() {
		return (
			<div className="friend-status-options d-flex align-items-center">
				<div style={{ width: '100%', height: '80%', borderBottom: '1px solid #2a2c31' }}>
					<div style={{ width: '60rem', height: '100%', position: 'relative' }}>
						<div
							style={{ width: '15rem', height: '100%' }}
							className="d-flex justify-content-between align-items-center"
						>
							<p className="friendstext ml-4">Name</p>
							<div style={{ width: '1px', height: '70%', backgroundColor: '#8e9297' }} className="ml-5" />
						</div>
						<div
							style={{
								width: '15rem',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '15rem'
							}}
							className="d-flex justify-content-between align-items-center"
						>
							<p className="friendstext ml-4">Status</p>
							<div style={{ width: '1px', height: '70%', backgroundColor: '#8e9297' }} className="ml-5" />
						</div>
						<div
							style={{
								width: '15rem',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '30rem'
							}}
							className="d-flex justify-content center align-items-center"
						>
							<p className="friendstext ml-4">Mutual Servers</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FriendsStatusHeader;
