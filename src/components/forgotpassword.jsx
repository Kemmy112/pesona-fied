import React, { useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import '../styles/forgotpswd.css'; // You can customize this.
import 'boxicons/css/boxicons.min.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


const handleReset = async (e) =>{
    e.preventDefault();
    const auth = getAuth()
    try{
        await sendPasswordResetEmail(auth, email, message)
        setMessage('Password Reset link sent. Check your inbox!');
        setError('');
    }catch(err){
        setError('Erroe. Please try again!');
        setMessage('');
    }
    
    
};

  return (
    <div className="forgot-wrapper">
      <form className="forgot-form" onSubmit={handleReset}>
        <h2 className="text-center mb-4">Forgot Password</h2>

        <div className="mb-3 position-relative">
          <label htmlFor="email" className="form-label">Enter your email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bx-envelope position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></i>
        </div>

        <button className="btn btn-dark w-100">Send Reset Link</button>

        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}

        <div className="text-center mt-3">
          <a href="/login">Back to Login</a>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
