import { useReducer, useCallback, useEffect } from 'react';
import useStore from './useStore';

const initialValue = {
  isFetchingFromRemote: false,
  results: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_LOADING':
      return {
        ...state,
        isFetchingFromRemote: true,
        error: null,
        results: action.payload.results,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetchingFromRemote: false,
        error: null,
        results: action.payload.results,
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

export default function useQuery({ type, query, initialState = [] }) {
  const store = useStore();
  const [state, dispatch] = useReducer(reducer, { ...initialValue, results: initialState });

  useEffect(() => {
    function handleTransform(_t) {
      let results = store.memory.cache.query(query);
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: { results },
      });
    }
    store.memory.on(`change:${type}`, handleTransform);
    return () => {
      store.memory.off(handleTransform);
    }
  }, [type, query, store.memory]);

  const doFetch = useCallback(async () => {
    try {
      let results = await store.memory.query(query);
      dispatch({
        type: 'FETCH_LOADING',
        payload: { results },
      });
    } catch(e) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: {
          error: e,
        }
      });
    }
  }, [query, store.memory]);

  return [state, doFetch];
}
