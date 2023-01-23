import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import axios from "axios";
import { RequestProvider } from "react-request-hook";
import { BrowserRouter } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://gorest.co.in/public-api",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RequestProvider value={axiosInstance}>
      <App />
    </RequestProvider>
  </BrowserRouter>
);
