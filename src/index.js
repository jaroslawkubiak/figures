import "./css/index.css";
import "./css/svg.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Provider } from "react-redux";
import { store } from "./store";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
