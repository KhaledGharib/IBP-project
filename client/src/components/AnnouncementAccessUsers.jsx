import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../../context/useStateContext";
export default function AnnouncementAccessUsers() {
  const [users, setUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  let { id } = useParams();

  const [search, setSearch] = useState("");

  const [quiz, setQuiz] = useState({
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get("/announcements")
      .then(({ data }) => {
        setLoading(false);
        setAnnouncements(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
      setCheckedUsers([...checkedUsers, user]);
      setSelectedUsers([...selectedUsers, user.id]);
    } else {
      setCheckedUsers(
        checkedUsers.filter((checkedUser) => checkedUser.id !== user.id)
      );
      setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
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

    // Update the accessUsersID array with the selected user IDs
    const accessUsersID = selectedUsers;

    const accessUsersJson = JSON.stringify(accessUsersID);

    const accessUsersData = {
      ...announcements,
      access_users: accessUsersJson,
    };

    axiosClient
      .put(`announcements/${announcements.id}`, accessUsersData)
      .then((response) => {
        console.log(accessUsersData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="bg-light card p-3 container-fluid">
        Select students to be able to access the {announcements.id}
      </h1>

      <form onSubmit={onSubmit}>
        <div className="container mt-5">
          <div className="shadow rounded-3 mt-3 animated fadeInDown">
            <table className="w-100">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      🦆 . . .
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
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
                      <td>{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      User not found 🙁
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button className="btn btn-dark mt-4">Save</button>
        </div>
      </form>
    </>
  );
}
