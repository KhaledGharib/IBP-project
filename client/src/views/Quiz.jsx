import React from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import QuizListItem from "../components/QuizListItem";

export default function Quiz() {
  const onDeleteClick = (e) => {
    e.preventDefault();
    console.log("deleted");
  };
  const { quizzes } = useStateContext();
  console.log(quizzes);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center animated fadeInDown ">
        <h1>Quiz</h1>
        <NavLink to="create" className="btn btn-success">
          Create new quiz
        </NavLink>
      </div>
      <div className="d-flex flex-column  gap-5 justify-content-center">
        {quizzes.map((quiz) => (
          <QuizListItem
            quiz={quiz}
            key={quiz.id}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </>
  );
}
