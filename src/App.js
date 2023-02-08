import "./App.css";
import React, { useCallback, useState } from "react";

import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";
import UsersList from "./components/UsersList/UsersList";
import NotFound from "./components/NotFound/NotFound";
import ShowToast from "./components/shared/ShowToast";
import { appContext } from "./context";
import ConfirmModal from "./components/shared/ConfirmModal";

function App() {
  const [toastData, setToastData] = useState({
    status: false,
    type: "info",
    message: "",
    title: "",
  });

  const setToast = useCallback(({ type, message, status, title }) => {
    setToastData({
      status: status || false,
      type: type || "",
      message: message || "",
      title: title || "Notification",
    });
  }, []);

  return (
    <div className="container-lg">
      <appContext.Provider
        value={{
          toastData,
          setToast,
        }}
      >
        <Header />
        <ConfirmModal />
        <ShowToast />
        <Routes>
          <Route path={"/"} element={<UsersList />} />
          <Route path={"/addUser"} element={<AddUser />} />
          <Route path={"/editUser/:id"} element={<EditUser />} />
          <Route path={"/*"} element={<NotFound />} />
        </Routes>
      </appContext.Provider>
    </div>
  );
}

export default App;
