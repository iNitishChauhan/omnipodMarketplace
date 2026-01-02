import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./authTypes";

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOGOUT:
      return {
        loading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        error: null,
      };
      

    default:
      return state;
  }
};

export default authReducer;
