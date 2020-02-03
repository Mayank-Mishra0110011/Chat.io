const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
	let errors = {};
	if (data.email) {
		data.email = !isEmpty(data.email) ? data.email : '';
		if (!validator.isEmail(data.email)) {
			errors.email = 'Email is invalid';
		}
	} else {
		errors.email = 'Email field is required';
	}
	if (data.password) {
		data.password = !isEmpty(data.password) ? data.password : '';
		if (validator.isEmpty(data.password)) {
			errors.password = 'Password field is required';
		}
	} else {
		errors.password = 'Password field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
