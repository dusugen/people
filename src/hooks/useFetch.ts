import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface IUseFetchParams {
  url: string;
  params?: string;
}

export function useFetch<D, M>({ url, params }: IUseFetchParams) {
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<M | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}?${params}`);
        setData(response.data.data as D);
        setMeta(response.data.meta as M);
      } catch (err) {
        const error = err as AxiosError;

        setError(new Error(error.message));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, params]);
  return { data, meta, error, isLoading };
}
