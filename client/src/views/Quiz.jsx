import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
import QuizListItem from "../components/QuizListItem";
export default function Quiz() {
  const [quizzes, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      axiosClient.delete(`/quiz/${id}`).then(() => {
        getQuizzes();
        // showToast("The survey was deleted");
      });
    }
  };

  const getQuizzes = (url) => {
    url = url || "/quiz";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setQuiz(data.data);
      console.log(data);
      // setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  console.log(quizzes);
  return (
    <>
      <div className="bg-light shadow d-flex p-3 justify-content-between align-items-center">
        <h1>Quizzes</h1>
        <NavLink to="create" className="btn btn-success">
          Create new quiz
        </NavLink>
      </div>
      <div className="d-flex container justify-content-between align-items-center animated fadeInDown "></div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          {quizzes.length === 0 && (
            <div className="pt-5 text-center">You don't have quiz created</div>
          )}
          <div className="d-flex flex-column pt-5 gap-5 justify-content-center">
            {quizzes.map((quiz) => (
              <QuizListItem
                quiz={quiz}
                key={quiz.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
