import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";

export default function AnnouncementView() {
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements();
  }, []);

  const getAnnouncements = () => {
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
  };

  const onRead = (announcement) => {
    setLoading(true);

    axiosClient
      .put(`/announcements/${announcement.id}`)
      .then(() => {
        setLoading(false);
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter((a) => a.id !== announcement.id)
        );
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg-light shadow d-flex p-3 justify-content-between align-items-center">
        <h1>Announcement</h1>
      </div>
      <div className="container animated fadeInDown mt-5">
        <div className="shadow rounded-3 mt-3 animated fadeInDown">
          <table className="w-100">
            <thead>
              <tr>
                <th>title</th>
                <th>Announce at</th>
                <th>Sender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="4" className="text-center">
                    🦆 . . .
                  </td>
                </tr>
              )}
              {!loading && announcements.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    You don't have any announcement
                  </td>
                </tr>
              )}
              {!loading &&
                announcements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td>{announcement.title}</td>
                    <td>{announcement.created_at}</td>
                    <td>{announcement.name}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={(e) => onRead(announcement)}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
