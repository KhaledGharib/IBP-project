import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
export default function UserLayout() {
  const [announcements, setAnnouncements] = useState([]);
  const { token, setToken, setUser, user } = useStateContext();

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
            <h1 className="text-light">qlap</h1>
          </div>
          <div className="">
            <Link to="/announcement" className="btn btn-info">
              {announcements.length}
            </Link>
          </div>
        </div>
      </header>

      <div className="d-flex">
        <aside>
          <div className="nav-item gap-3 d-flex flex-column ">
            <NavLink
              className={({ isActive }) => (isActive ? "isActive" : "inactive")}
              to="/student"
            >
              <i className="bi bi-puzzle-fill" style={{ fontSize: "2rem" }}></i>
              Quizzes
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "isActive" : "inactive "
              }
              to="/chat/:id"
            >
              <i
                className="bi bi-chat-dots-fill"
                style={{ fontSize: "2rem" }}
              ></i>
              Chat
            </NavLink>
            <NavLink className="inactive mt-5" onClick={onLogout}>
              <i
                className="bi bi-door-open-fill"
                style={{ fontSize: "2rem" }}
              ></i>
              Logout
            </NavLink>
          </div>
        </aside>

        <main className="p-3 w-100" style={{ backgroundColor: "#f5f6fa" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
