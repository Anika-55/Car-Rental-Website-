import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const Login = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        const res = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        // Update display name and photoURL
        await updateProfile(res.user, {
          displayName: formData.name,
          photoURL: formData.photoURL || null,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 py-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl font-medium mb-2">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        {state !== "login" && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full mb-3"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full mb-3"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn w-full bg-indigo-500 text-white mb-3"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn w-full bg-red-500 text-white"
        >
          Sign in with Google
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-indigo-500 hover:underline">Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
