const initialState = {
  loading: false,
  media: [],
  error: null,
};

const usermediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERMEDIA_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "USERMEDIA_SUCCESS":
      return {
        loading: false,
        media: action.payload,
        error: null,
      };

    case "USERMEDIA_FAIL":
      return {
        loading: false,
        media: [],
        error: action.payload,
      };

    case "USERMEDIA_RESET":
      return initialState;

    default:
      return state;
  }
};
export default usermediaReducer;
