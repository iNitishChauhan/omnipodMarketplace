import axios from "axios";
import { API_URL } from "../../components/URLS";
export const fetchMedia = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "MEDIA_REQUEST" });

    const { token } = getState().auth;

    const res = await axios.get(
      `${API_URL}medias`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log(res.data.data)
    dispatch({
      type: "MEDIA_SUCCESS",
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: "MEDIA_FAIL",
      payload:
        error.response?.data?.message || "Failed to load media",
    });
  }
};
