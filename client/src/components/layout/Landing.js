import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	render() {
		return (
			<div>
				<header className="container-fluid" style={{ backgroundColor: '#23272A' }}>
					<div className="row justify-content-center py-3 px-3">
						<Link to="/">
							<img src="./assets/image/logo.png" alt="logo" className="img-fluid" />
						</Link>
					</div>
				</header>
				<main
					className="container-fluid pt-5 cover"
					style={{ backgroundColor: '#2C2F33', position: 'relative' }}
				>
					<div className="row pt-5">
						<div className="col-lg-12 text-light text-center">
							<h1 style={{ fontWeight: 'bolder', letterSpacing: '2px' }} className="pb-2">
								Ready to use chat.io? It's Free
							</h1>
						</div>
					</div>
					<div className="row py-5">
						<div className="col-lg-12 text-light text-center">
							<p className="text-muted" style={{ fontWeight: '400' }}>
								All-in-one voice, text and video chat that's free, secure, and works on both your
								desktop and phone.
							</p>
						</div>
					</div>
					<div className="row pt-5">
						<div className="col-lg-12 text-center pb-2">
							<Link
								to="/login"
								className="btn btn-light text-center click"
								role="button"
								style={{ width: '10rem' }}
							>
								Login
							</Link>
						</div>
					</div>
					<div className="row py-4">
						<div className="col-lg-12 text-center pb-2">
							<Link
								to="/register"
								className="btn text-light click"
								role="button"
								style={{ backgroundColor: '#7289DA', width: '10rem' }}
							>
								Sign Up
							</Link>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Landing));
