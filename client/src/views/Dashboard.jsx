import React, { useState } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { AttendData, UserData } from "../components/UserData";
export default function Dashboard() {
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
            <p>65</p>
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
            <p>65</p>
          </figure>
          <figure
            className=" shadow  container-fluid rounded h-100"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between align-items-center ">
              <h3>something here </h3>
              <div className="bg-dark p-1 rounded-bottom">
                <i className="bi bi-stars fs-3 text-light"></i>
              </div>
            </div>
            <p>65</p>
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
        </div>
        <div className="col shadow rounded-2">
          <h3>Attendance chart</h3>

          <PieChart chartData={attendData} />
        </div>
      </div>
    </div>
  );
}
