const initialState = {
  user_id: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user_id: action.payload.user_id,
      };
    case "LOGOUT":
      return {
        ...state,
        user_id: null,
      };
    default:
      return state;
  }
}
