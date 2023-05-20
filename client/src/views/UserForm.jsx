import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";

export default function UserForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { message, setMessage } = useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);

          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setMessage("updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post(`/users`, user)
        .then(() => {
          setMessage("Created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };
  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div
        style={{ backgroundColor: "#fff" }}
        className="shadow rounded-2 p-3 animated fadeInDown"
      >
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form
            className="d-flex flex-column gap-4 animated fadeInDown "
            onSubmit={onSubmit}
          >
            <div>
              <label>Full name</label>
              <input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
              />
            </div>

            <div>
              <label>Role</label>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="0">User</option>
                <option value="1">Admin</option>
              </select>
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
              />
            </div>
            <div>
              <label>Password Confirmation</label>
              <input
                type="password"
                onChange={(e) =>
                  setUser({
                    ...user,
                    password_confirmation: e.target.value,
                  })
                }
                placeholder="Password Confirmation"
              />
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
