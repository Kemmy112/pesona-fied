import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/global.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./components/forgotpassword";
import Navbar from "./components/navbar";
import Homepage from "./pages/home";
import About from './pages/about';
import Dashboard from "./pages/dashboard";
import VerifyEmail from "./pages/verifyemail";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />, <Navbar />, <Homepage />, <About />, <ForgotPassword />, <Login />, <Signup />, <VerifyEmail />,  <Dashboard />);
