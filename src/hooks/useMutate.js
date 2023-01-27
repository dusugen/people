import axios from "axios";
import { useState } from "react";

axios.defaults.headers.common["Authorization"] =
  "Bearer a019c9536eedd587466d73b86bef4d9ad520c34ec6196cb63c67417e971612f1";

function useMutate({ url, method }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = (data) => {
    const promise = new Promise((resolve, reject) => {
      setIsLoading(true);

      axios({
        method,
        url,
        data,
      })
        .then((response) => {
          const {
            data: { code, message, data },
          } = response;

          const errorMessage = message || code;

          if (code >= 400) {
            setError(new Error(errorMessage));
            reject(errorMessage);
          } else {
            setData(data);
            resolve(data || true);
          }
        })
        .catch((err) => {
          setError(err);
          reject(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });

    return promise;
  };

  return [{ data, error, isLoading }, sendRequest];
}

export default useMutate;
