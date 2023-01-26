import "./App.css";
import React, { useCallback, useState } from "react";

import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";
import UsersList from "./components/UsersList/UsersList";
import NotFound from "./components/NotFound/NotFound";
import ShowToast from "./components/Toast/ShowToast";
import { ShowContext } from "./context";

function App() {
  const [toastStatus, setToastStatus] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [toastMessage, setToastMessage] = useState("");

  const setToast = useCallback(({ type, message, status }) => {
    setToastType(type);
    setToastMessage(message);
    setToastStatus(status || false);
  }, []);

  return (
    <div className="container-lg container-md">
      <ShowContext.Provider
        value={{ toastStatus, toastType, toastMessage, setToast }}
      >
        <Header />
        <ShowToast />
        <Routes>
          <Route path={"/"} element={<UsersList />} />
          <Route path={"/addUser"} element={<AddUser />} />
          <Route path={"/editUser/:id"} element={<EditUser />} />
          <Route path={"/*"} element={<NotFound />} />
        </Routes>
      </ShowContext.Provider>
    </div>
  );
}

export default App;
