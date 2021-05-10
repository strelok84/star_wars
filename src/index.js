import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter basename="/star_wars">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
