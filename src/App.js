import "./App.css";
import React from "react";

import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";
import UsersList from "./components/UsersList/UsersList";
import NotFound from "./components/NotFound/NotFound";
import { Toast } from "react-bootstrap";

function App() {
  return (
    <div className="container-lg container-md">
      <Header />
      <Routes>
        <Route path={"/"} element={<UsersList />} />
        <Route path={"/addUser"} element={<AddUser />} />
        <Route path={"/editUser/:id"} element={<EditUser />} />
        <Route path={"/*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
