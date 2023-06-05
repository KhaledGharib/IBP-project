import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function QuizListItem({ quiz, onDeleteClick }) {
  return (
    <div className="container p-3 d-flex overflow-hidden justify-content-between align-content-center animated fadeInDown shadow rounded bg-light">
      <div>
        <div className="d-flex gap-3 align-items-center">
          <img src={quiz.image_url} className="w-25" />
          <h4 className="text-center">{quiz.title}</h4>
        </div>
        <div className="d-flex gap-4 mt-4">
          <p className="mb-3">Expire Date: {quiz.expire_date}</p>
          <p className="mb-3">Description: {quiz.description}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-4">
        <NavLink className="" to={`/quiz/${quiz.id}`}>
          <i className=" btn btn-primary bi bi-pencil-square"></i>
        </NavLink>
        <NavLink className="" to={`/quizzes/access-users/${quiz.slug}`}>
          <i className="bi bi-person-fill-add btn btn-success"></i>
        </NavLink>
        <a href={`/quiz/public/${quiz.slug}`}>
          <i className="bi bi-box-arrow-up-right btn btn-dark"></i>
        </a>

        {quiz.id && (
          <button
            className="btn btn-danger"
            onClick={(e) => onDeleteClick(quiz.id)}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
}
