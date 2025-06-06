import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { motion } from 'framer-motion';
import { 
  HiOutlineMail, 
  HiOutlineArrowRight,
  HiOutlineRefresh,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineCheck
} from 'react-icons/hi';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setError("");
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setSuccess(true);
        setResendDisabled(true);
        setCountdown(60); // 60 seconds cooldown
      } else {
        setError("No user found. Please sign in again.");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      let errorMessage = "Failed to send verification email";
      
      switch (error.code) {
        case 'auth/too-many-requests':
          errorMessage = "Too many attempts. Please try again later.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Network error. Please check your connection.";
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-300 flex items-center justify-center px-4 py-8">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
      >
        {isDarkMode ? (
          <HiOutlineSun className="w-6 h-6 text-yellow-500" />
        ) : (
          <HiOutlineMoon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Icon and Title */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-3"
          >
            <HiOutlineMail className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Verify Your Email
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            Check your inbox for the verification link
          </p>
        </div>

        {/* Content Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
        >
          <div className="space-y-6">
            {/* Email Display */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Please check your email at:
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1 text-sm">
                {email}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Click the verification link in the email to activate your account. If you don't see the email, check your spam folder.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Success Message */}
            {success && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 text-sm text-center flex items-center justify-center space-x-1"
              >
                <HiOutlineCheck className="w-4 h-4" />
                <span>Verification email sent successfully!</span>
              </motion.p>
            )}

            {/* Resend Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResendVerification}
              disabled={loading || resendDisabled}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <HiOutlineRefresh className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : resendDisabled ? (
                <>
                  <span>Resend in {countdown}s</span>
                </>
              ) : (
                <>
                  <span>Resend Verification Email</span>
                  <HiOutlineArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Back to Login */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <button
                onClick={() => navigate("/login")}
                disabled={loading}
                className="text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back to Login
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default VerifyEmail;


