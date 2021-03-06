import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { removeUserName } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { RiSlideshow3Fill } from "react-icons/ri";
import Modal from "./Modal";

export default function Navbar(props) {
  /* Redux */
  const { logout } = UserAuth();
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
        <Link to={`/`} className="nav-title-link" style={{ display: "flex" }}>
          <RiSlideshow3Fill
            className="nav-button-icon"
            size="1.7em"
            style={{ marginRight: 4 }}
          />
          <p className="nav-title">AniMT</p>
        </Link>
        <div onClick={() => setOpenModal(true)} className="nav-button">
          <GiHamburgerMenu className="nav-button-icon" size="1.7em" />
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
