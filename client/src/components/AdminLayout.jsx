import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client.js";
export default function Layout() {
  const { token, setToken, setUser, user } = useStateContext();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/announcements")
      .then(({ data }) => {
        setAnnouncements(data.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, []);
  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post("logout").then(() => {
      setUser(null);
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/profile").then(({ data }) => {
      setUser(data);
    });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleOpen = () => {
    const aside = document.querySelector("aside");
    const isActive = aside.classList.toggle("active");
    if (isActive) {
      document.querySelector(".bi.bi-list").style.display = "none";
      document.querySelector(".bi.bi-x-lg").style.display = "inline-block";
    } else {
      document.querySelector(".bi.bi-list").style.display = "inline-block";
      document.querySelector(".bi.bi-x-lg").style.display = "none";
    }
  };

  return (
    <>
      <header>
        <div className="navbar bg-dark p-2">
          <div className="d-flex gap-3 align-items-center">
            <button className="btn btn-primary" onClick={handleOpen}>
              <i className="bi bi-list"></i>
              <i className="bi bi-x-lg"></i>
            </button>
            <h1 className="text-light">Qlap</h1>
          </div>
          <div className="d-flex align-items-center gap-3 text-light">
            <Link to="/announcement" className="btn btn-info">
              {announcements.length}
            </Link>
            <div className="dropdown">
              <div className="dropbtn">
                <img src="../../img/photo-1510227272981-87123e259b17.jpeg" />
              </div>
              <div className="dropdown-content">
                <Link to={`/profile/${user.id}`}>Profile</Link>
                <Link to="#">Setting</Link>
                <Link to="#" onClick={onLogout} className="btn-logout">
                  logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="d-flex">
        <aside>
          <div className="nav-item gap-3 d-flex flex-column ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "isActive text-dark-hover" : "inactive"
              }
              to="/"
            >
              <i
                style={{ fontSize: "2rem" }}
                className="bi bi-speedometer2"
              ></i>
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "isActive " : "inactive"
              }
              to="/users"
            >
              <i
                className="bi bi-people-fill "
                style={{ fontSize: "2rem" }}
              ></i>
              users
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "isActive" : "inactive "
              }
              to="/chat"
            >
              <i
                className="bi bi-chat-dots-fill"
                style={{ fontSize: "2rem" }}
              ></i>
              Chat
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "isActive" : "inactive")}
              to="/quizzes"
            >
              <i className="bi bi-puzzle-fill" style={{ fontSize: "2rem" }}></i>
              Quizzes
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "isActive" : "inactive")}
              to="/announcement"
            >
              <i
                className="bi bi-megaphone-fill"
                style={{ fontSize: "2rem" }}
              ></i>
              Announcement
            </NavLink>
            <button className="logout hover" onClick={onLogout}>
              <i
                className="bi bi-door-open-fill"
                style={{ fontSize: "2rem" }}
              ></i>
              Logout
            </button>
          </div>
        </aside>

        <main className="p-3 w-100" style={{ backgroundColor: "#f5f6fa" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
