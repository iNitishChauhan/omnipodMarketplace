import axios from "axios";
import { API_URL } from "../../components/URLS";
export const fetchUserMedia = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USERMEDIA_REQUEST" });

    const { token } = getState().auth;

    const res = await axios.get(
      `${API_URL}media/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
//console.log(res.data.data)
    dispatch({
      type: "USERMEDIA_SUCCESS",
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: "USERMEDIA_FAIL",
      payload:
        error.response?.data?.message || "Failed to load media",
    });
  }
};
