import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDefaultView } from '../../actions/viewAction';

class Friends extends Component {
	componentDidMount() {
		[ ...document.getElementsByClassName('friendsbox') ].forEach((friend) => {
			friend.addEventListener('click', function() {
				let active = document.getElementsByClassName('activetab')[0];
				active.classList.remove('activetab');
				this.classList.add('activetab');
			});
		});
	}
	render() {
		return (
			<div className="friends" onClick={this.props.setDefaultView}>
				<div className="friendsbox d-flex justify-content-center activetab">
					<div
						style={{ width: '30%', height: '100%' }}
						className="d-flex justify-content-end align-items-center"
					>
						<img
							src="./assets/image/friends2.png"
							className="img-fluid"
							style={{ maxHeight: '60%' }}
							id="friendsicon"
							alt="friendsicon"
						/>
					</div>
					<div style={{ width: '50%', height: '100%' }} className="d-flex align-items-center">
						<p className="friendstext">Friends</p>
					</div>
				</div>
			</div>
		);
	}
}

Friends.propTypes = {
	currentView: PropTypes.object.isRequired,
	setDefaultView: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	currentView: state.currentView
});

export default connect(mapStateToProps, { setDefaultView })(Friends);
