import "./App.css";
import React, { useCallback, useState } from "react";

import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";
import UsersList from "./components/UsersList/UsersList";
import NotFound from "./components/NotFound/NotFound";
import ShowToast from "./components/shared/ShowToast";
import { AppContext } from "./appContext";

export interface IToastData {
  status: boolean;
  type: string;
  message: string;
  title?: string;
}

const App: React.FC = () => {
  const [toastData, setToastData] = useState<IToastData>({
    status: false,
    type: "info",
    message: "",
    title: "",
  });

  const setToast = useCallback(
    ({ type, message, status, title }: IToastData) => {
      setToastData({
        status: status || false,
        type: type || "",
        message: message || "",
        title: title || "Notification",
      });
    },
    []
  );

  return (
    <div className="container-lg">
      <AppContext.Provider
        value={{
          toastData,
          setToast,
        }}
      >
        <Header />
        <ShowToast />
        <Routes>
          <Route path={"/"} element={<UsersList />} />
          <Route path={"/addUser"} element={<AddUser />} />
          <Route path={"/editUser/:id"} element={<EditUser />} />
          <Route path={"/*"} element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
