import React from "react";
import axios from "axios";
import useFetchState from './useFetchState'

export default function usePosts() {
  const { state, startFetch, success, error } = useFetchState()
  const refetch = React.useCallback(async () => {
    startFetch()
    try {
      const data = await axios.get("/api/todos").then((res) => {
        return res.data
      });
      success(data)
    } catch (e) {
      console.log(e)
      error(e)
    }
  }, [])

  React.useEffect(() => {
    refetch();
  }, []);

  return {
    ...state,
    refetch
  };
}
