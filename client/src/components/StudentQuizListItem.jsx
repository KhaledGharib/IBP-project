import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function QuizListItem({ quiz, onDeleteClick }) {
  return (
    <div className="container d-flex overflow-hidden justify-content-between align-content-center animated fadeInDown shadow rounded bg-light">
      <div className="d-flex gap-3 align-items-center">
        <img src={quiz.image_url} className="w-25" />
        <h4 className="text-center">{quiz.title}</h4>
        <div
          dangerouslySetInnerHTML={{ __html: quiz.description }}
          className="overflow-hidden text-center"
        ></div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <a href={`/quiz/public/${quiz.slug}`}>
          <i className="bi bi-play-fill btn btn-dark"></i>
        </a>
      </div>
    </div>
  );
}
