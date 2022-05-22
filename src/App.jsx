import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import AllAnimeBySeason from "./components/AllAnimeBySeason";
import AnimeSingleView from "./components/AnimeSingleView";
import MyWatchList from "./components/MyWatchList";
import Users from "./components/Users";
import UserAnimeList from "./components/UserAnimeList";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <AuthContextProvider>
        <ScrollToTop>
          <Routes>
            <Route path="/login" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/seasons/:season"
              element={<AllAnimeBySeason />}
            ></Route>
            <Route
              path="/anime/:id/:name"
              element={<AnimeSingleView />}
            ></Route>
            <Route path="/animewatchlist" element={<MyWatchList />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:username" element={<UserAnimeList />}></Route>
          </Routes>
        </ScrollToTop>
      </AuthContextProvider>
    </>
  );
}

export default App;
