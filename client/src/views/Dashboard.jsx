import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Chat from "./Chat";
import { AttendData, UserData } from "../components/UserData";
export default function Dashboard() {
  const [quizzes, setQuiz] = useState([]);
  const [user, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "AVG Grads",
        data: UserData.map((data) => data.grade),
      },
    ],
  });
  const [attendData, setAttendData] = useState({
    labels: Object.keys(AttendData[0]),

    datasets: [
      {
        label: "Attendance",
        data: Object.values(AttendData[0]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  // ===============================
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
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

  const filteredUsers = user.filter((user) => user.role === 0);

  const getQuizzes = (url) => {
    url = url || "/quiz";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setQuiz(data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getQuizzes();
  }, []);

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

  // ===============================

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col  d-flex flex-column animated fadeInDown ">
          <figure
            className=" shadow  container-fluid rounded h-100 "
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center ">
              <h3>Students </h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-people-fill fs-3 text-light"></i>
              </div>
            </div>

            {
              <div>
                {
                  <p className=" bold text-center text-dark fs-3">
                    {filteredUsers.length}
                  </p>
                }
              </div>
            }
          </figure>
          <figure
            className=" shadow container-fluid rounded h-100"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center ">
              <h3>Answers </h3>
              <div className=" bg-dark p-1 rounded-bottom">
                <i className="bi bi-file-earmark-fill fs-3 text-light"></i>
              </div>
            </div>
            <p>65</p>
          </figure>
        </div>

        <div className="col d-flex flex-column animated fadeInDown ">
          <figure
            className=" shadow  container-fluid rounded h-100"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center ">
              <h3>Quizzes </h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-puzzle-fill fs-3 text-light"></i>
              </div>
            </div>
            <p className=" bold text-center text-dark fs-3">{quizzes.length}</p>
          </figure>
          <figure
            className=" shadow  container-fluid rounded h-100"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center ">
              <h3>Announcements </h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-megaphone-fill fs-3 text-light"></i>
              </div>
            </div>
            <p className=" bold text-center text-dark fs-3">
              {announcements.length}
            </p>
          </figure>
        </div>
        <figure
          className=" shadow rounded p-1 col-4 animated fadeInDown"
          style={{ backgroundColor: "#fff" }}
        >
          <h3>AVG marks</h3>
          <BarChart chartData={data} />
        </figure>
      </div>
      <div
        className="row gap-4 mt-3
      mb-5"
      >
        <div className="col shadow rounded-2">
          <h3>Chat box</h3>
          <Chat />
        </div>
        <div className="col shadow rounded-2">
          <h3>Attendance chart</h3>

          <PieChart chartData={attendData} />
        </div>
      </div>
    </div>
  );
}
