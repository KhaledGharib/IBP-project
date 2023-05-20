// import { useStateContext } from "../../context/useStateContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
export default function Profile() {
  // const { user, token } = useStateContext();

  const { message, setMessage } = useStateContext();
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

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
          toast.success("Updated", {
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
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            toast.error("Something went wrong", {
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
    } else {
      axiosClient
        .post(`/users`, user)
        .then(() => {
          setMessage("Created");
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
    <div className=" container w-50 p-2 rounded-2 shadow d-flex flex-column gap-5 justify-content-between align-items-center">
      <div className="d-flex justify-content-center">
        <img
          className="profile-avatar"
          src="../../img/photo-1510227272981-87123e259b17.jpeg"
        />
      </div>
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
  );
}
