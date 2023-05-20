import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  return (
    <div className=" bg-light ">
      <div className=" vh-100 d-flex container align-items-center justify-content-center ">
        <form
          onSubmit={onSubmit}
          className="d-flex  rounded-5 p-lg-5 p-md-5 p-3 shadow flex-column w-90 gap-3 "
        >
          <p className="text-center fs-2  ">Login into your account</p>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={emailRef} type="text" placeholder="username" />
          <input ref={passwordRef} type="password" placeholder="password" />
          <button
            className="btn btn-primary fw-bold p-2 border-0"
            style={{ background: "#5b08a7" }}
          >
            Login
          </button>
          <p className="text-center mb-0 text-muted ">
            Don't have an account? &nbsp;
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#5b08a7" }}
            >
              Signup!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
