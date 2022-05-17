import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  let componentMounted = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Passwords do not match`);
    }

    try {
      setError("");
      setLoading(true);
      const response = await createUser(
        emailRef.current.value,
        passwordRef.current.value
      );
      localStorage.setItem("Auth Token", response._tokenResponse.idToken);
      navigate("/");
    } catch (error) {
      const errorMessage = handleFirebaseErrors(error.message);
      setError(errorMessage);
    } finally {
      setLoading(false);
      return () => {
        componentMounted = false;
      };
    }
  };

  const handleFirebaseErrors = (message) => {
    if (message === "Firebase: Error (auth/invalid-email).") {
      return "Invalid Email!";
    }
    if (
      message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return "Password should be at least 6 characters";
    }
    return message;
  };

  return (
    <>
      <div className="signup-form-container">
        <div className="signup-title">
          <h2 className="text-center mb-4">Sign up</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            ref={emailRef}
            required
          />
          <input
            className="auth-input"
            placeholder="Username"
            type="text"
            ref={usernameRef}
            required
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            ref={passwordRef}
            required
          />
          <input
            className="auth-input"
            placeholder="Confirm Password"
            type="password"
            ref={passwordConfirmRef}
            required
          />
          <div className="signup-btn-container">
            <button disabled={loading} className="signup-btn">
              Sign up
            </button>
          </div>
        </form>
        <div className="signup-additional-info">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
