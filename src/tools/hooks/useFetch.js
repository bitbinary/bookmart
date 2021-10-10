/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useReducer } from 'react';
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
  putRequest,
} from '../apiHelper';
import { CancelToken } from 'axios'
//Defining the set of available httpMethod and their corresponsing functions
const apiMethods = {
  GET: getRequest,
  POST: postRequest,
  PATCH: patchRequest,
  DELETE: deleteRequest,
  PUT: putRequest,
};
// Custom hook to call the API and get the result
// INPUTS:
//  url: url to call
//  params: params for get request ot the body for the other requests
//  method: HTTP method to be used
//  shouldCache: Whether the URL should be cached;
// RETURNS:
//  status: status of the api call
//  error: error status with error is any
//  data: dat from the response
export const useFetch = (url, params, method = 'GET', shouldCache = false) => {
  // Initialising the cache object
  const cache = useRef({});
  // Initialising the initial state
  const initialState = {
    status: 'idle',
    error: null,
    data: null,
  };
  // Reduced for state updation
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  }, initialState);

  // UseEffect that handles the API call
  useEffect(() => {
    const ourRequest = CancelToken.source() // <-- 1st step
    let cancelRequest = false;
    if (!url) return;
    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url] && shouldCache) {
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          const response = await apiMethods[method](url, params, {
            cancelToken: ourRequest.token, // <-- 2nd step
          });
          const data = await response.data;
          cache.current[url] = data;
          if (cancelRequest && shouldCache) return;
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest && shouldCache) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();
    return () => {
      ourRequest.cancel() // <-- 3rd step
    }

  }, [url, JSON.stringify(params)]);
  return state;
};
