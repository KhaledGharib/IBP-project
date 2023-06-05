import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { AttendData, UserData } from "../components/UserData";
import Chat from "./Chat";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [user, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [loading, setLoading] = useState(false);
  const [dashData, setDashData] = useState({});

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

  useEffect(() => {
    getUser();
    getQuizzes();
    getAnnouncements();
    getDashboardData();
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
      setQuizzes(data.data);
      setLoading(false);
    });
  };

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

  const getDashboardData = () => {
    setLoading(true);
    axiosClient
      .get(`/dashboard`)
      .then((res) => {
        setLoading(false);
        setDashData(res.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-6 col-lg-3 animated fadeInDown">
          <div
            className="shadow container-fluid rounded"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h3>Students</h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-people-fill fs-3 text-light"></i>
              </div>
            </div>
            <p className="bold text-center text-dark fs-3">
              {filteredUsers.length}
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 animated fadeInDown">
          <div
            className="shadow container-fluid rounded"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h3>Answers</h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-file-earmark-fill fs-3 text-light"></i>
              </div>
            </div>
            <p className="bold text-center text-dark fs-3">
              {dashData.totalAnswers}
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 animated fadeInDown">
          <div
            className="shadow container-fluid rounded"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h3>Quizzes</h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-puzzle-fill fs-3 text-light"></i>
              </div>
            </div>
            <p className="bold text-center text-dark fs-3">
              {dashData.totalQuizzes}
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 animated fadeInDown">
          <div
            className="shadow container-fluid rounded"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h3>Announcements</h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-megaphone-fill fs-3 text-light"></i>
              </div>
            </div>
            <p className="bold text-center text-dark fs-3">
              {announcements.length}
            </p>
          </div>
        </div>
      </div>
      <div className="row mt-3 mb-5">
        <div className="col-md-6 mb-4">
          <div className="shadow rounded-2 p-1 animated fadeInDown">
            <h3>AVG marks</h3>
            <BarChart chartData={data} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="shadow rounded-2 p-1 animated fadeInDown">
            <h3>Attendance chart</h3>
            <PieChart chartData={attendData} />
          </div>
        </div>
      </div>
      <div
        className="row my-4"
        style={{
          backgroundColor: "#fff",
          maxHeight: "300px",
          overflowY: "scroll",
        }}
      >
        {dashData.latestAnswers && dashData.latestAnswers.length > 0 ? (
          <div className="text-left">
            {dashData.latestAnswers.map((answer) => (
              <a
                href="#"
                key={answer.id}
                className="block p-2 hover:bg-gray-100/90"
              >
                <div className="font-semibold">{answer.quiz.title}</div>
                <small>
                  Answer Made at:{" "}
                  <i className="font-semibold">{answer.end_date}</i>
                </small>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-center py-16">
            You don't have any answers yet
          </div>
        )}
      </div>

      <div className="row my-4 py-4" style={{ backgroundColor: "#fff" }}>
        <div className="col-12">
          <h3>Chat box</h3>
          <Chat />
        </div>
      </div>
    </div>
  );
}
