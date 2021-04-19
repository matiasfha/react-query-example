import React from "react";
import axios from "axios";

export default function usePosts() {
  const [state, setState] = React.useReducer((_, action) => action, {
    isLoading: true
  });

  const fetch = async () => {
    setState({ isLoading: true });
    try {
      const data = await axios.get("/api/todos").then((res) => {
        console.log(res);
        return res.data;
      });
      setState({ isSuccess: true, data });
    } catch (error) {
      setState({ isError: true, error });
    }
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return {
    ...state,
    fetch
  };
}
