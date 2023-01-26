import axios from "axios";
import { useState } from "react";

axios.defaults.headers.common["Authorization"] =
  "Bearer a019c9536eedd587466d73b86bef4d9ad520c34ec6196cb63c67417e971612f1";

function useMutate({ url, method }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = (data) => {
    setIsLoading(true);

    return axios({
      method,
      url,
      data,
    })
      .then((response) => {
        if (response.data.code >= 400) {
          setError(new Error(response.data.message));
        } else {
          setData(response.data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return [{ data, error, isLoading }, sendRequest];
}

export default useMutate;
