import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authAction";

class Login extends Component {
  constructor() {
    super();
    Login.getDerivedStateFromProps = Login.getDerivedStateFromProps.bind(this);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  static getDerivedStateFromProps(nextProps, previousState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }
    if (nextProps.errors !== previousState.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid login-bg text-light">
        <div className="row py-5 mx-5">
          <div
            className="col-lg-7 col-md-7 col-sm-7 col-12 py-5"
            style={{ backgroundColor: "#2C2F33", borderRadius: "5px" }}
          >
            <div className="d-flex flex-column align-items-center">
              <h3 className="pb-2">Welcome Back!</h3>
              <p className="text-muted pt-2" style={{ fontWeight: "bolder" }}>
                Let's get you logged back in!
              </p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-11 col-md-11 col-sm-10 col-12">
                <form onSubmit={this.onSubmit} noValidate>
                  <div className="form-group pb-2">
                    <label
                      htmlFor="email"
                      className="text-muted"
                      style={{ fontWeight: "bold" }}
                    >
                      Email
                    </label>
                    <input
                      className={classnames("form-control finput", {
                        "is-invalid": errors.email
                      })}
                      autoComplete="off"
                      type="text"
                      name="email"
                      id="email"
                      aria-describedby="email"
                      autoFocus
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="text-muted"
                      style={{ fontWeight: "bold" }}
                    >
                      Password
                    </label>
                    <input
                      className={classnames("form-control finput", {
                        "is-invalid": errors.password
                      })}
                      autoComplete="off"
                      type="password"
                      name="password"
                      id="password"
                      aria-describedby="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <Link to="#" className="flink">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="form-group pb-1">
                    <button
                      type="submit"
                      className="btn text-light click"
                      style={{ backgroundColor: "#7289DA", width: "12rem" }}
                    >
                      Login
                    </button>
                  </div>
                  <p className="text-muted">
                    New User?{" "}
                    <Link to="/register" className="flink">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
