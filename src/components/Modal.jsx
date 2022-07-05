import React from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Modal({ open, onClose, handleLogout }) {
  const { username } = useSelector((state) => state.users);
  const { user } = UserAuth();
  if (!open) {
    return null;
  }

  return (
    <>
      <div onClick={onClose} className="overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modalContainer"
        >
          <div className="close-btn-container">
            <p onClick={onClose} className="modal-close-btn">
              <IoIosCloseCircle size="1.8em" />
            </p>
          </div>
          <div className="modal-button-container">
            {!user && (
              <Link className="nav-login-link-text" to="/login">
                <div className="nav-login-link">
                  <RiLogoutBoxFill style={{ marginLeft: 8 }} size="2em" />
                  <p>Login</p>
                </div>
              </Link>
            )}
            {user && (
              <div onClick={handleLogout} className="nav-logout-link">
                <RiLogoutBoxFill style={{ marginLeft: 12 }} size="2em" />
                <p>Logout</p>
              </div>
            )}
            {!user && (
              <a className="signup-icon" href="/signup">
                <FaUserPlus style={{ marginLeft: 15 }} size="2em" />
                <p>Sign up</p>
              </a>
            )}
            {user && (
              <Link className="nav-my-list-link-text" to={`/animewatchlist`}>
                <div className="watch-list-wrapper">
                  <BsFillCollectionPlayFill
                    className="watch-icon"
                    style={{ marginLeft: 2 }}
                    size="2em"
                  />
                  <p>WatchList</p>
                </div>
              </Link>
            )}
            <Link className="nav-users-link-text" to={`/users`}>
              <div className="nav-users-link">
                <FaUserFriends style={{ marginLeft: 8 }} size="2em" />
                <p>Users</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
