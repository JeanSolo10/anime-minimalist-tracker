import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const { resetPassword } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(`Check your inbox for further instructions!`);
    } catch (error) {
      const errorMessage = handleFirebaseErrors(error.message);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseErrors = (message) => {
    if (message === "Firebase: Error (auth/invalid-email).") {
      return "Email not found!";
    }
    return message;
  };

  return (
    <>
      <div className="forgot-password-form-container">
        <div className="forgot-password-title">
          <h2 className="text-center mb-4">Password Reset</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="password-reset-message">{message}</div>}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            ref={emailRef}
            required
          />
          <div className="forgot-password-btn-container">
            <button disabled={loading} className="forgot-password-btn">
              Reset Password
            </button>
          </div>
        </form>
        <div className="forgot-password-login-link">
          <Link to="/login">Login</Link>
        </div>
        <div className="forgot-password-additional-info">
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}
