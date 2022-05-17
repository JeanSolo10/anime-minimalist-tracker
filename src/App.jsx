import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import axios from "axios";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
