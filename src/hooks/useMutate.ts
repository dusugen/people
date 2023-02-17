import axios from "axios";
import { useCallback, useState } from "react";
import config from "../config.json";
import { TServerResponse } from "../types";

axios.defaults.headers.common["Authorization"] = `Bearer ${config.apiToken}`;

interface IMutateParams {
  url: string;
  method: string;
}

interface IMutateReturn<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

type IMutateFunction<B, D> = (data?: Partial<B>) => Promise<D | null>;

type TError = {
  message: string;
};

function useMutate<B, D>({
  url,
  method,
}: IMutateParams): [IMutateReturn<D>, IMutateFunction<B, D>] {
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback<IMutateFunction<B, D>>(
    (body) =>
      new Promise((resolve, reject) => {
        setIsLoading(true);

        axios<TServerResponse<unknown>>({
          method,
          url,
          data: body,
        })
          .then((axiosRes) => {
            const code = axiosRes.data.code;
            const isSuccess = code < 400;
            const response = isSuccess ? (axiosRes.data.data as D) : null;
            const error = !isSuccess ? (axiosRes.data.data as TError) : null;

            setData(response);
            setError(error ? new Error(error.message) : null);

            if (isSuccess) {
              resolve(response);
            } else {
              reject(error?.message);
            }
          })
          .catch((err) => {
            setError(err);
            reject(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }),
    [method, url]
  );

  return [{ data, error, isLoading }, sendRequest];
}

export default useMutate;
