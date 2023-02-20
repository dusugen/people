import { createContext } from "react";
import { IToastData } from "./App";

interface IContext {
  toastData: IToastData;

  setToast(data: IToastData): void;
}

export const AppContext = createContext<IContext>({
  toastData: {
    status: false,
    type: "info",
    message: "",
    title: "",
  },
  setToast: () => {},
});
