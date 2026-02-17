const initialState = {
  loading: false,
  media: [],
  error: null,
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MEDIA_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "MEDIA_SUCCESS":
      return {
        loading: false,
        media: action.payload,
        error: null,
      };

    case "MEDIA_FAIL":
      return {
        loading: false,
        media: [],
        error: action.payload,
      };

    case "MEDIA_RESET":
      return initialState;

    default:
      return state;
  }
};
export default mediaReducer;
