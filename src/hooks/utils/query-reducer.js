

const initialState = {
  isFetchingFromRemote: false,
  data: undefined,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_LOADING':
      return {
        ...state,
        isFetchingFromRemote: true,
        error: null,
        data: action.payload.data,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetchingFromRemote: false,
        error: null,
        data: action.payload.data,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isFetchingFromRemote: false,
        error: action.payload.error,
      };
    default:
      throw new Error('Unhandled ACTION');
  }
}
