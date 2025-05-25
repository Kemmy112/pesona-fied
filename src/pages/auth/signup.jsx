import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { handleGoogleSignIn } from "../../utils/authUtils";
import "../../styles/global.css";
import "boxicons/css/boxicons.css";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleToggle = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const onGoogleClick = async () => {
    const response = await handleGoogleSignIn();

    if (response.success) {
      // Optional: Store user info or auth state
      console.log("User:", response.user);
      navigate("/verify-email", { state: { email: response.user.email } }); // pass email here too
    } else {
      alert("Google sign-in failed. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // important!

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: username });
      await setDoc(doc(db, "users", username), {
        uid: res.user.uid,
        email,
        username,
        fullName,
      });
      await sendEmailVerification(res.user);
      await signOut(auth); // Sign them out right after sending the email

      alert("Account created! A verification email has been sent.");

      // Navigate and pass email so verify email page can show it
      navigate("/verify-email");

    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-header">
        <div className="titles">
          <div className="title-register active">Register</div>
        </div>
      </div>

      <form
        id="registerForm"
        className="register-form"
        autoComplete="off"
        onSubmit={handleSignup}
      >
        <div className="mb-3 position-relative">
          <label htmlFor="reg-fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            className="form-control"
            id="reg-fullname"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <i
            className="bx bx-user position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          ></i>
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="reg-username" className="form-label">
            Username
          </label>
          <input
            type="text"
            value={username}
            className="form-control"
            id="reg-username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <i
            className="bx bx-envelope position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          ></i>
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="reg-email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            className="form-control"
            id="reg-email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i
            className="bx bx-envelope position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          ></i>
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="reg-pass" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="form-control"
            id="reg-pass"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className="bx bx-lock-alt position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          ></i>
        </div>

        <div className="google-wrap">
          <button
            className="btn btn-outline-light w-100 mt-3"
            type="button"
            onClick={onGoogleClick}
          >
            <i className="bx bxl-google me-2"></i>Continue with Google
          </button>
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="agree" />
          <label className="form-check-label" htmlFor="agree">
            I agree to terms & conditions
          </label>
        </div>

        {error && <p className="text-danger mt-3">{error}</p>}

        <button type="submit" className="btn btn-success w-100 mb-3" onClick={()=> navigate("/verify-email", { state: { email } })}>
          Sign Up <i className="bx bx-user-plus"></i>
        </button>

        <div className="text-center">
          <span>
            Already have an account? <a href="#" onClick={handleToggle}>Login</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;

