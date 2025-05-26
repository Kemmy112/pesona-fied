import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase/config';
import { doc, getDoc } from "firebase/firestore";
import { handleGoogleSignIn } from "../../utils/authUtils";
import '../../styles/global.css'
import 'boxicons/css/boxicons.css';

function Login() {
  const navigate = useNavigate();
  const[emailOrUsername, setEmailOrUsername] = useState('')
  const[password, setPassword] = useState('')
  const[error, setError] = useState('')
  

  const handleToggle = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-pswd");
  };

  const onGoogleClick = async () => {
    const response = await handleGoogleSignIn();

    if (response.success) {
      // Optional: Store user info or auth state
      console.log("User:", response.user);
      navigate("/dashboard"); // or wherever you want
    } else {
      alert("Google sign-in failed. Please try again.");
    }
  };

 const handleLogin = async ({ username, password }) => {
  const userDoc = await getDoc(doc(db, "users", username));

  if (!userDoc.exists()) {
    throw new Error("User not found");
  }

  const email = userDoc.data().email;

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  console.log("Logged in:", user.displayName);
};


  return (
    <div className="wrapper">
      <div className="form-header">
        <div className="titles">
          <div className="title-login active">Login</div>
        </div>
      </div>

      <form id="loginForm" className="login-form" autoComplete="off" onSubmit={handleLogin}>
        <div className="mb-3 position-relative">
          <label htmlFor="log-email" className="form-label">Username</label>
          <input type="text" value={emailOrUsername} className="form-control" id="log-email" onChange={(e)=> setEmailOrUsername(e.target.value)} required />
          <i className="bx bx-envelope position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="log-pass" className="form-label">Password</label>
          <input type="password" value={password} className="form-control" id="log-pass" onChange={(e) => setPassword(e.target.value)} required />
          <i className="bx bx-lock-alt position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
        </div>

        <div className="google-wrap">
            <button className="btn btn-outline-light w-100 mt-3" onClick={onGoogleClick}>
                <i className="bx bxl-google me-2"></i>Continue with Google</button>
        </div>


        <div className="d-flex justify-content-between mb-3">
          <div></div>
          <div>
            <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
          </div>
        </div>

         {error && <p className="text-danger mt-3">{error}</p>}

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Sign In <i className="bx bx-log-in"></i>
        </button>

        <div className="text-center">
          <span>
            Don’t have an account? <a href="#" onClick={handleToggle}>Register</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;

