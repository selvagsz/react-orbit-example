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

export default function useQuery({ type, query }, deps = []) {
  const store = useStore();
  const [state, dispatch] = useReducer(reducer, initialValue);
  const memoizedQueryBuilder = useCallback(query, deps);

  useEffect(() => {
    function handleTransform(_t) {
      let results = store.memory.cache.query(memoizedQueryBuilder);
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: { results },
      });
    }
    store.memory.on(`change:${type}`, handleTransform);
    return () => store.memory.off(handleTransform);
  }, [type, memoizedQueryBuilder, store.memory]);

  const doFetch = useCallback(async () => {
    let results = await store.memory.query(memoizedQueryBuilder);
    dispatch({
      type: 'FETCH_LOADING',
      payload: { results },
    });
  }, [memoizedQueryBuilder, store.memory]);

  return [state, doFetch];
}
