import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config"; // adjust path if different

export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // You can do more here: save to localStorage, redirect, etc.
    console.log("Google user signed in:", user);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Google Sign-In error:", error);
    return {
      success: false,
      error,
    };
  }
};
