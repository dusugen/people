import axios from "axios";
import { useState } from "react";

axios.defaults.headers.common["Authorization"] =
  "Bearer a019c9536eedd587466d73b86bef4d9ad520c34ec6196cb63c67417e971612f1";

function useMutate({ url, method }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method,
        url,
        data,
      });
      if (response.data.code >= 400) {
        alert(response.data.data.message);
      }
      if (response.data.code < 400 && response.data.code >= 200) {
        setData(response.data);
      }
    } catch (err) {
      setError(err);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  return [{ data, error, isLoading }, sendRequest];
}

export default useMutate;
