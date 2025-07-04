import { registerUser } from "../api";

const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
const REGISTRATION_FAILURE = "REGISTRATION_FAILURE";
const CLEAR_AUTH_MESSAGE = "CLEAR_AUTH_MESSAGE";

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Action creators
export const registerRequest = () => ({
  type: REGISTRATION_REQUEST,
});

export const registrationSuccess = (message) => ({
  type: REGISTRATION_SUCCESS,
  payload: message,
});

export const registrationFailure = (error) => ({
  type: REGISTRATION_FAILURE,
  payload: error,
});

export const clearAuthMessage = () => ({
  type: CLEAR_AUTH_MESSAGE,
});

// Thunk for registration
export const register = (name, email, password, password_confirmation) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await registerUser(
        name,
        email,
        password,
        password_confirmation
      );
      dispatch(
        registrationSuccess(response.data?.message || "Registration Successful")
      );
    } catch (error) {
      dispatch(
        registrationFailure(
          error.response?.data?.message || "Registration Failed"
        )
      );
    }
  };
};

// Reducer function
const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };
    case CLEAR_AUTH_MESSAGE:
      return {
        ...state,
        error: null,
        message: null,
      };
    default:
      return state;
  }
};
export default registrationReducer;
