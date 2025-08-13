import { useReducer, useEffect } from "react";
import axios from "axios";

const apiReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.error,
      };
    default:
      throw new Error();
  }
};

const useApi = (url) => {
  const [state, dispatch] = useReducer(apiReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchUrl = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await axios.get(url, { signal: controller.signal });
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Operation aborted:", err.message);
        } else {
          dispatch({ type: "FETCH_FAILURE", error: err.message });
        }
      }
    };
    fetchUrl();
    return () => {
      controller.abort();
    };
  }, [url]);

  return state;
};

export default useApi;
