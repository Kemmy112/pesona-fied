import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/home";
import Login from "./pages/auth/login";
import Signup from './pages/auth/signup';
import VerifyEmail from "./pages/verifyemail";
import Navbar from "./components/navbar";
import ForgotPassword from "./pages/auth/forgotpassword";
import About from './pages/about';
import Dashboard from "./pages/dashboard";
import CreatePersona from "./pages/create-persona";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
  <Router>
      <Routes>

        {/* ✅ Homepage with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Homepage />
            </>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path ="/about" element={<About/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/create-persona"
          element={
            <ProtectedRoute>
              <CreatePersona />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>)
}

export default App;
