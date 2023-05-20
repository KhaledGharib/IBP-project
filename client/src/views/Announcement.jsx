import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
import AnnouncementView from "../components/AnnouncementView";

export default function Announcement() {
  const titleRef = useRef();
  const { announcement, setAnnouncement } = useStateContext();

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

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: titleRef.current.value,
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
      <div className="card shadow p-1 animated fadeInDown   ">
        <div className="d-flex align-items-center justify-content-between">
          <span className="fs-4">Add new announcement</span>
          <div className="d-flex gap-2  align-items-center">
            <span>Off</span>
            <label className="switch">
              <input id="slide" type="checkbox" />
              <span onClick={slider} className="slider round"></span>
            </label>
            <span>On</span>
          </div>
        </div>
        <div id="cont" className="cont">
          <form onSubmit={onSubmit} className="container-fluid">
            <div className="d-flex align-self-center justify-content-center gap-3 mt-4">
              <input
                ref={titleRef}
                id="announcement"
                className="w-50"
                type="text"
                // required
              />
              <button className="btn btn-primary">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <AnnouncementView />
    </>
  );
}
