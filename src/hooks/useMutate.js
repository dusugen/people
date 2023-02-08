import axios from "axios";
import { useCallback, useState } from "react";
import config from "../config.json";

axios.defaults.headers.common["Authorization"] = `${config.apiToken}`;

function useMutate({ url, method }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback((data) => {
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
          const result = data || true;

          if (code >= 400) {
            setError(new Error(errorMessage));
            reject(errorMessage);
          } else {
            setData(result);
            resolve(result);
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
  }, []);

  return [{ data, error, isLoading }, sendRequest];
}

export default useMutate;
