import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
import AnnouncementView from "../components/AnnouncementView";

export default function Announcement() {
  const [users, setUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const { announcement, setAnnouncement, user } = useStateContext();

  setTimeout(() => {
    let slideElement = document.getElementById("slide");
    if (slideElement) {
      let slideStatus = localStorage.getItem("SLIDE");
      if (slideStatus === "on" && !slideElement.classList.contains("isOpen")) {
        slideElement.checked = true;
        document.getElementById("cont").classList.add("isOpen");
      } else {
        localStorage.removeItem("SLIDE");
      }
    }
  });

  const slider = () => {
    const slideToggle = document
      .getElementById("cont")
      .classList.toggle("isOpen");
    let slideState = document.getElementById("slide").value;

    if (slideToggle) {
      localStorage.setItem("SLIDE", slideState);
    } else {
      localStorage.removeItem("SLIDE");
    }
  };

  const filteredUsers = users.filter(
    (user) => user.role === 0 && user.id.toString().includes(search)
  );

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);

    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleCheckboxChange = (event, user) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, user]);
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.id]);
    } else {
      setCheckedUsers((prevCheckedUsers) =>
        prevCheckedUsers.filter((checkedUser) => checkedUser.id !== user.id)
      );
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== user.id)
      );
    }
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setCheckedUsers(filteredUsers);
      const userIDs = filteredUsers.map((user) => user.id);
      setSelectedUsers(userIDs);
    } else {
      setCheckedUsers([]);
      setSelectedUsers([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const accessUsersID = selectedUsers;

    const accessUsersJson = JSON.stringify(accessUsersID);

    const payload = {
      title: titleRef.current.value,
      user_name: user.name,
      access_users: accessUsersJson,
    };
    axiosClient
      .post("/announcements", payload)
      .then(({ data }) => {
        setAnnouncement(data.announcement);
        document.getElementById("announcement").value = "";
        toast.success("announcement sent successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          theme: "colored",
        });
        console.log(payload);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          toast.error("The field is required", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
            theme: "colored",
          });
        }
      });
  };

  return (
    <>
      <div className=" p-3 shadow p-1 animated fadeInDown   ">
        <div className="d-flex align-items-center justify-content-between">
          <span className="fs-4">Add new announcement</span>
          <div className="d-flex gap-2  align-items-center">
            <label className="switch">
              <input id="slide" type="checkbox" />
              <span onClick={slider} className="slider round"></span>
            </label>
          </div>
        </div>
        <div id="cont" className="cont">
          <form onSubmit={onSubmit} className="container-fluid">
            <div className="d-flex align-self-center justify-content-center gap-3 mt-4 pb-5">
              <input
                placeholder="Announcement message"
                ref={titleRef}
                id="announcement"
                type="text"
                required
              />
            </div>
            <h3 className="bg-light p-3 container-fluid">
              Select students for announcement access
            </h3>
            <div className="container-fluid">
              <div className="mb-3 d-flex gap-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by User ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary">
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>User ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3">Loading users...</td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={checkedUsers.includes(user)}
                              onChange={(e) => handleCheckboxChange(e, user)}
                            />
                          </td>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AnnouncementView />
    </>
  );
}
