import { SET_DEFAULT_VIEW, SET_DM_VIEW, SET_SERVER_VIEW } from '../actions/types';

const initialState = {
	view: 'default'
};

export default function(state = initialState, action) {
	if (action.type === SET_DEFAULT_VIEW || action.type === SET_DM_VIEW || action.type === SET_SERVER_VIEW) {
		return {
			...state,
			view: action.payload
		};
	}
	return state;
}
