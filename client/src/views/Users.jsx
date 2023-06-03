import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setMessage } = useStateContext();
  const [search, setSearch] = useState("");

  const onDelete = (user) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setMessage("deleted");
      getUsers();
    });
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

  return (
    <>
      <div className="bg-light shadow d-flex p-3 justify-content-between align-items-center">
        <h1>Users</h1>
        <div className="d-flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for ID"
          />
          <Link to="/users/new" className="btn btn-success">
            <i className="bi bi-person-add"></i>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="shadow rounded-3 mt-3 animated fadeInDown">
          <table className="w-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading && (
              <tbody>
                <tr>
                  <td colSpan="5" id="td" className="text-center">
                    🦆 . . .
                  </td>
                </tr>
              </tbody>
            )}
            {!loading && (
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.created_at}</td>
                      <td>
                        <Link
                          className="btn btn-primary"
                          to={`/users/edit/${user.id}`}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={(e) => onDelete(user)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      User not found 🙁
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
