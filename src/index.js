import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/global.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
// import Homepage from "./pages/home";
// import Navbar from "./components/layout/navbar";
import Sidebar from "./components/layout/sidebar";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />, <Sidebar/>);
