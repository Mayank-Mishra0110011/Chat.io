import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import viewReducer from './viewReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	currentView: viewReducer
});
