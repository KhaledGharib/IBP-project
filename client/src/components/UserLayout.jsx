import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useParams } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
export default function UserLayout() {
  const [announcements, setAnnouncements] = useState([]);
  const { token, setToken, setUser, user } = useStateContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchAnnouncements = async (token) => {
      try {
        const { data } = await axiosClient.get("/announcements");
        setAnnouncements(data.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    if (token) {
      fetchAnnouncements(token);
    }
  }, [token]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axiosClient.get("/profile");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const getAvatar = () => {
      if (id) {
        axiosClient
          .get(`/users/${id}`)
          .then(({ data }) => {
            setUser(data);
          })
          .catch(() => {});
      }
    };

    getAvatar();
  }, [id]);

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
          <div className="d-flex align-items-center gap-3 text-light">
            <Link to="announcement" className="btn btn-info">
              {announcements.length}
            </Link>
            <div className="dropdown">
              <div className="dropbtn">
                {user.image && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                    className="profile-avatar"
                  />
                )}

                {!user.image && (
                  <span className="d-flex justify-content-center align-items-center ">
                    <i className="bi bi-person-fill fs-1 "></i>
                  </span>
                )}
              </div>
              <div className="dropdown-content rounded">
                <Link to={`profile/${user.id}`}>Profile</Link>
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
              className={({ isActive }) => (isActive ? "isActive" : "inactive")}
              to="myquizzes"
            >
              <i className="bi bi-puzzle-fill" style={{ fontSize: "2rem" }}></i>
              Quizzes
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "isActive" : "inactive "
              }
              to={`chat/{user.id}`}
            >
              <i
                className="bi bi-chat-dots-fill"
                style={{ fontSize: "2rem" }}
              ></i>
              Chat
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "isActive" : "inactive")}
              to="announcement"
            >
              <i
                className="bi bi-megaphone-fill"
                style={{ fontSize: "2rem" }}
              ></i>
              Announcement
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

        <main className=" w-100" style={{ backgroundColor: "#f5f6fa" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
