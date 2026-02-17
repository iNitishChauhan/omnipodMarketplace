import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./authTypes";

export const login = (email, password, role) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const res = await axios.post(
      "https://omnipodmarketplace.minddigital.in/api/login",
      { email, password, role },
      { headers: { "Content-Type": "application/json" } }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response?.data?.message || "Invalid login credentials",
    });
  }
};


export const logout = () => (dispatch) => {
  // ✅ clear persistent data
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  dispatch({ type: LOGOUT });
};