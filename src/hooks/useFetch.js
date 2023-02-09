import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch({ url, method, params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        if (method === "get") {
          const response = await axios.get(`${url}?${params}`);
          setData(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, method, params]);
  return { data, error, isLoading };
}
