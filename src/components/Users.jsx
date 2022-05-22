import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
axios.defaults.baseURL = "/";

export default function Users() {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    let componentMounted = true;
    fetchUsers();
    return () => {
      componentMounted = false;
    };
  }, [user]);

  const fetchUsers = async () => {
    const url = `api/v1/users`;
    const response = await axios.get(url);
    let data = response.data.results;
    if (user) {
      data = data.filter((u) => {
        return user.email !== u.email;
      });
    }

    return setUsers(data);
  };

  return (
    <>
      <Navbar setError={setError} />
      {error && <div className="auth-error-message">{error}</div>}
      <div className="users-main-grid">
        <div className="users-title">
          <h2>Users</h2>
        </div>
        <div className="users-main-body">
          {users &&
            users.map((userData, index) => (
              <Link
                key={index}
                className="user-link"
                to={`/users/${userData.username}`}
              >
                <div className="user-poster">
                  <div className="user-icon-grid">
                    <FaUserAlt className="user-icon" size="1.5em" />
                  </div>
                  <div className="user-name">{userData.username}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
