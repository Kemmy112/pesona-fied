import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { handleGoogleSignIn } from "../../utils/authUtils";
import { motion } from 'framer-motion';
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineUserAdd,
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineRefresh
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleToggle = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const checkUsernameAvailability = async (username) => {
    if (!username) return;
    try {
      console.log("Checking username availability for:", username);
      const userDoc = await getDoc(doc(db, "users", username));
      console.log("Firestore response:", userDoc.exists());
      setUsernameAvailable(!userDoc.exists());
    } catch (error) {
      console.error("Error checking username:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        name: error.name
      });
      setUsernameAvailable(null);
      setError("Error connecting to database. Please try again.");
    }
  };

  const onGoogleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await handleGoogleSignIn();
      if (response.success) {
        navigate("/verify-email", { state: { email: response.user.email } });
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    if (!usernameAvailable) {
      setError("Username is not available");
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with username
      await updateProfile(user, { displayName: username });

      // Create user document in Firestore
      await setDoc(doc(db, "users", username), {
        uid: user.uid,
        email,
        username,
        fullName,
        createdAt: new Date().toISOString(),
        emailVerified: false,
        lastLogin: new Date().toISOString(),
        profileComplete: false
      });

      // Send verification email
      await sendEmailVerification(user);

      // Sign out user (Firebase best practice)
      await signOut(auth);

      // Redirect to verify email page
      navigate("/verify-email", { state: { email } });
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "An error occurred during signup";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email is already registered";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Network error. Please check your connection";
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
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-3"
          >
            <HiOutlineUserAdd className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            Join us today
          </p>
        </div>

        {/* Signup Form */}
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSignup}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
        >
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="relative">
              <label htmlFor="reg-fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="reg-fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                  disabled={loading}
                />
                <HiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Username Field */}
            <div className="relative">
              <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="reg-username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    checkUsernameAvailability(e.target.value);
                  }}
                  className="w-full px-4 py-3 pl-12 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                  disabled={loading}
                />
                <HiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {username && (
                <p className={`text-xs mt-1 ${
                  usernameAvailable === null ? 'text-gray-500' :
                  usernameAvailable ? 'text-green-500' : 'text-red-500'
                }`}>
                  {usernameAvailable === null ? 'Checking...' :
                   usernameAvailable ? 'Username available' : 'Username taken'}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="reg-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                  disabled={loading}
                />
                <HiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="reg-pass" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="reg-pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                  disabled={loading}
                />
                <HiOutlineLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setAgreeToTerms(!agreeToTerms)}
                disabled={loading}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  agreeToTerms 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {agreeToTerms && <HiOutlineCheck className="w-3 h-3 text-white" />}
              </button>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <HiOutlineRefresh className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <HiOutlineArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Google Sign In */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onGoogleClick}
              disabled={loading}
              className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-lg flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </motion.button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={handleToggle}
                disabled={loading}
                className="text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign in
              </button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Signup;

