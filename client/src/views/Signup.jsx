import { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className=" bg-light ">
      <div className=" vh-100 d-flex container align-items-center justify-content-center ">
        <form
          onSubmit={onSubmit}
          className="d-flex  rounded-5 p-lg-5 p-md-4 p-sm-3 p-3 shadow flex-column w-90 gap-3 "
        >
          <p className="text-center fs-2  ">Let's signup your account</p>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Password Confirmation"
          />
          <button
            className="btn btn-primary fw-bold p-2"
            style={{ background: "#5b08a7" }}
          >
            Signup
          </button>
          <span className="text-center mb-0 text-muted ">
            Already have an account? &nbsp;
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#5b08a7" }}
            >
              Login!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
