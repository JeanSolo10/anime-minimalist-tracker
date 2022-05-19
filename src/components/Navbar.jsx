import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { removeUserName } from "../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import Modal from "./Modal";

export default function Navbar(props) {
  /* Redux */
  const { username } = useSelector((state) => state.users);
  const { user, logout } = UserAuth();
  const { setError } = props;
  /* State */
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      localStorage.removeItem("Auth Token");
      dispatch(removeUserName());
      navigate("/login");
    } catch (error) {
      setError("Failed to logout");
    }
  };

  return (
    <>
      <nav className="nav-main-grid">
        <p className="nav-title">Anime Tracker</p>
        <div onClick={() => setOpenModal(true)} className="nav-button">
          <GiHamburgerMenu size="1.4em" />
        </div>
      </nav>
      <Modal
        handleLogout={handleLogout}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
