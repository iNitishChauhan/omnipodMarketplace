import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./authTypes";
import { API_URL } from "../../components/URLS";

export const login = (email, password, role) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const res = await axios.post(
      API_URL + "login",
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


export const logout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    // ✅ clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch({ type: LOGOUT });
    if (token && user) {
      await axios.post(
        API_URL + "logout",
        {
          user_id: user.id, // ✅ send user id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.log("Logout API error:", error);
  }
};