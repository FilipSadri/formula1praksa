import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/main.css";
import 'bootstrap/dist/css/bootstrap.css';


var root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App propString="String value from index file"/>);