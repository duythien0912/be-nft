import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initContractWithOutAccount } from "./web3/init";
import "./index.css";

try {
  initContractWithOutAccount().then(() => {
    ReactDOM.render(<App />, document.querySelector("#root"));
  });
} catch (e) {
  ReactDOM.render(<App />, document.querySelector("#root"));
}
