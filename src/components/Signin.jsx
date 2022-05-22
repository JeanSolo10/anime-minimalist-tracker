import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { setUserName } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
axios.defaults.baseURL = "/";

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let componentMounted = true;
    const authToken = localStorage.getItem("Auth Token");
    if (authToken && user) {
      navigate("/");
    }
    return () => {
      componentMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const response = await signIn(
        emailRef.current.value,
        passwordRef.current.value
      );
      localStorage.setItem("Auth Token", response._tokenResponse.idToken);
      const username = await fetchUserName(response.user.uid);
      dispatch(setUserName(username));
      navigate("/");
    } catch (error) {
      const errorMessage = handleFirebaseErrors(error.message);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserName = async (uid) => {
    const url = `/api/v1/users/${uid}`;
    const response = await axios.get(url);
    return response.data.results[0].username;
  };

  const handleFirebaseErrors = (message) => {
    if (message === "Firebase: Error (auth/wrong-password).") {
      return "Invalid Password!";
    }
    if (message === "Firebase: Error (auth/user-not-found).") {
      return "User not found!";
    }
    return message;
  };

  return (
    <>
      <div className="login-form-container">
        <div className="login-title">
          <h2 className="text-center mb-4">Login</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            ref={emailRef}
            required
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            ref={passwordRef}
            required
          />
          <div className="login-btn-container">
            <button disabled={loading} className="login-btn">
              Login
            </button>
          </div>
        </form>
        <div className="login-additional-info">
          Forgot Password? <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="login-additional-info">
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}
