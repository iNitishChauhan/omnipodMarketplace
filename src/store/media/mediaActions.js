import axios from "axios";
export const fetchUserMedia = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "MEDIA_REQUEST" });

    const { token } = getState().auth;

    const res = await axios.get(
      `https://omnipodmarketplace.minddigital.in/api/media/user/${userId}`,
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
