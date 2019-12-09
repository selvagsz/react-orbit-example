import { useReducer, useCallback, useEffect, useRef } from 'react';
import queryReducer from './utils/query-reducer';
import useStore from './useStore';

export default function useQuery({ subscribeTo = 'transform' }) {
  const store = useStore();
  const [state = {}, dispatch] = useReducer(queryReducer);
  const queryBuilderRef = useRef(null);

  const handleTransform = useCallback(() => {
    let data = store.memory.cache.query(queryBuilderRef.current);
    dispatch({
      type: 'FETCH_SUCCESS',
      payload: { data },
    });
  }, [store.memory.cache])

  useEffect(() => {
    store.memory.on(subscribeTo, handleTransform);
    return () => {
      store.memory.off(subscribeTo, handleTransform);
    }
  }, [handleTransform, subscribeTo, store.memory]);

  const queryStore = useCallback(async (queryBuilder) => {
    try {
      let data = await store.memory.query(queryBuilder);
      queryBuilderRef.current = queryBuilder;
      dispatch({
        type: 'FETCH_LOADING',
        payload: { data },
      });
    } catch(e) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: {
          error: e,
        }
      });
      throw e;
    }
  }, [store.memory]);

  return { ...state, queryStore };
}
