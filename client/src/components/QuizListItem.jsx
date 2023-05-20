import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function QuizListItem({ quiz, onDeleteClick }) {
  return (
    <div className="d-flex overflow-hidden align-content-center animated fadeInDown shadow rounded bg-light">
      <div className="d-flex gap-3 align-items-center">
        <img src={quiz.image_url} className="w-25" />
        <h4 className="text-center">{quiz.title}</h4>
        <div
          dangerouslySetInnerHTML={{ __html: quiz.description }}
          className="overflow-hidden text-center"
        ></div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <NavLink className="" to={`/quiz/${quiz.id}`}>
          <i className=" btn btn-primary bi bi-pencil-square"></i>
        </NavLink>
        <i className="bi bi-box-arrow-up-right btn btn-dark">
          <a href={`/view/quiz/${quiz.slug}`}></a>
        </i>

        {quiz.id && (
          <button className="btn btn-danger" onClick={onDeleteClick}>
            <i className="bi bi-trash3-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
}
