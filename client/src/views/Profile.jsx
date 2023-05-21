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
    image: null,
    image_url: null,
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
    const payload = { ...user };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/users/${id}`, payload);
    } else {
      res = axiosClient.post("/users", payload);
    }

    res
      .then((res) => {
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
  };

  const onImageChoose = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setUser({
        ...user,
        image: file,
        image_url: reader.result,
      });

      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className=" container w-50 p-2 rounded-2 shadow d-flex flex-column gap-5 justify-content-between align-items-center">
      {/*Image */}

      <div>
        <label className="">Avatar</label>
        <div className="mt-1 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center">
            {user.image_url && (
              <img id="avatar" src={user.image_url} className="" />
            )}
            {!user.image_url && (
              <span className="d-flex justify-content-center align-items-center ">
                <i className="bi bi-image fs-1 "></i>
              </span>
            )}
          </div>
          <div className="input-group ms-5">
            <label
              className="input-group-text rounded-1 btn btn-secondary"
              htmlFor="image"
              style={{ cursor: "pointer" }}
            >
              Change
            </label>
            <input
              id="image"
              name="image"
              type="file"
              className=" form-control d-none"
              onChange={onImageChoose}
            />
          </div>
        </div>
      </div>
      {/*Image */}

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
