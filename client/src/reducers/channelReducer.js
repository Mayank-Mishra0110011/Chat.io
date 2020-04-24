import {
  CHANNEL_MESSAGES_LOADING,
  GET_CHANNEL_MESSAGES,
  ADD_CHANNEL_MESSAGE,
} from "../actions/types";

const initialState = {
  messagesLoading: false,
  messages: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANNEL_MESSAGES_LOADING:
      return { ...state, messagesLoading: true };
    case GET_CHANNEL_MESSAGES:
      return {
        ...state,
        messagesLoading: false,
        messages: action.payload,
      };
    case ADD_CHANNEL_MESSAGE:
      const { _id, username, profilePicture, message } = action.payload;
      return {
        ...state,
        ...state.messages.push({
          _id: _id,
          content: message,
          createdAt: Date.now(),
          sender: {
            _id: _id,
            username: username,
            profilePicture: profilePicture,
          },
        }),
      };
    default:
      return state;
  }
}
