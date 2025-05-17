import React, { useState } from 'react';
import '../../styles/global.css'; 
import 'boxicons/css/boxicons.min.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="wrapper">
  <div className="form-header">
    <div className="titles">
      <div className={`title-login ${isLogin ? 'active' : ''}`}>Login</div>
      <div className={`title-register ${!isLogin ? 'active' : ''}`}>Register</div>
    </div>
  </div>

  {isLogin ? (
    <form id="loginForm" className="login-form" autoComplete="off">
      <div className="mb-3 position-relative">
        <label htmlFor="log-email" className="form-label">Username/Email Address</label>
        <input type="text" className="form-control" id="log-email" required />
        <i className="bx bx-envelope position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
      </div>

      <div className="mb-3 position-relative">
        <label htmlFor="log-pass" className="form-label">Password</label>
        <input type="password" className="form-control" id="log-pass" required />
        <i className="bx bx-lock-alt position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div></div>
        <div>
          <a href="#">Forgot password?</a>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 mb-3">
        Sign In <i className="bx bx-log-in"></i>
      </button>

      <div className="text-center">
        <span>
          Don't have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
            Register
          </a>
        </span>
      </div>
    </form>
  ) : (
    <form id="registerForm" className="register-form" autoComplete="off">
      <div className="mb-3 position-relative">
        <label htmlFor="reg-name" className="form-label">Full name</label>
        <input type="text" className="form-control" id="reg-name" required />
        <i className="bx bx-user position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
      </div>

      <div className="mb-3 position-relative">
        <label htmlFor="reg-email" className="form-label">Username/Email Address</label>
        <input type="text" className="form-control" id="reg-email" required />
        <i className="bx bx-envelope position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
      </div>

      <div className="mb-3 position-relative">
        <label htmlFor="reg-pass" className="form-label">Password</label>
        <input type="password" className="form-control" id="reg-pass" required />
        <i className="bx bx-lock-alt position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
      </div>

      <div className="form-check mb-3">
        <input type="checkbox" className="form-check-input" id="agree" />
        <label className="form-check-label" htmlFor="agree">
          I agree to terms & conditions
        </label>
      </div>

      <button type="submit" className="btn btn-success w-100 mb-3">
        Sign Up <i className="bx bx-user-plus"></i>
      </button>

      <div className="text-center">
        <span>
          Already have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
            Login
          </a>
        </span>
      </div>
    </form>
  )}
</div>

  );
}

export default AuthForm;
