import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FaGoogle, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [state, setState] = useState("login"); // "login" or "signup"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === "login") {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        toast.success("Logged in successfully!");
      } else {
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          setLoading(false);
          return;
        }

        const res = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(res.user, {
          displayName: formData.name,
          photoURL: formData.photoURL || null,
        });
        toast.success("Account created successfully!");
      }
      setFormData({ name: "", email: "", password: "", photoURL: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      <ToastContainer position="top-right" />

      {/* Left Image */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        {!currentUser && (
          <form
            onSubmit={handleSubmit}
            className="md:w-96 w-80 flex flex-col items-center justify-center"
          >
            <h2 className="text-4xl text-gray-900 font-medium">
              {state === "login" ? "Sign in" : "Sign up"}
            </h2>
            <p className="text-sm text-gray-500/90 mt-3">
              {state === "login"
                ? "Welcome back! Please sign in to continue"
                : "Create a new account"}
            </p>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full gap-2"
            >
              <FaGoogle className="text-red-500" size={20} />
              {loading ? "Processing..." : "Continue with Google"}
            </button>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="w-full text-nowrap text-sm text-gray-500/90">
                or {state} with email
              </p>
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            {/* Name field for signup */}
            {state === "signup" && (
              <div className="flex items-center w-full h-12 mb-4 border rounded-full px-4 gap-2">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="flex items-center w-full h-12 mb-4 border rounded-full px-4 gap-2">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center w-full h-12 mb-4 border rounded-full px-4 gap-2">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            {/* Photo URL for signup */}
            {state === "signup" && (
              <input
                type="text"
                name="photoURL"
                placeholder="Photo URL (optional)"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full h-12 px-4 mb-4 border rounded-full outline-none"
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full h-12 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            >
              {loading
                ? "Processing..."
                : state === "login"
                ? "Login"
                : "Sign Up"}
            </button>

            <p className="text-gray-500/90 text-sm mt-4">
              {state === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                onClick={() => setState(state === "login" ? "signup" : "login")}
                className="text-indigo-400 hover:underline cursor-pointer"
              >
                {state === "login" ? "Sign up" : "Login"}
              </span>
            </p>
          </form>
        )}

        {/* User Profile */}
        {currentUser && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <img
              src={currentUser.photoURL || "https://via.placeholder.com/40"}
              alt={currentUser.displayName || "User"}
              className="w-20 h-20 rounded-full"
            />
            <span className="text-gray-700 text-lg">
              {currentUser.displayName || currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
