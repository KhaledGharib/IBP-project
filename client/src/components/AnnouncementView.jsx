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

  const onDelete = (announcement) => {
    setLoading(true);

    axiosClient
      .delete(`/announcements/${announcement.id}`)
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
    <div className="p-1 animated fadeInDown mt-5">
      <h1>Announcement View</h1>

      <div className="shadow rounded-3 mt-3 animated fadeInDown">
        <table className="w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>Create Date</th>
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
                  Announcement not found 🥲
                </td>
              </tr>
            )}
            {!loading &&
              announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>{announcement.id}</td>
                  <td>{announcement.title}</td>
                  <td>{announcement.created_at}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => onDelete(announcement)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
