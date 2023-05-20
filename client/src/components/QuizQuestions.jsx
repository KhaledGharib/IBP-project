import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";

export default function QuizQuestions({ questions, onQuestionsUpdate }) {
  const [myQuestions, setMyQuestions] = useState({ ...questions });

  const addQuestion = (index) => {
    index = index !== undefined ? index : myQuestions.length;
    myQuestions.splice(index, 0, {
      id: uuidv4(),
      type: "text",
      question: "",
      description: "",
      data: {},
    });
    setMyQuestions([...myQuestions]);
    onQuestionsUpdate(myQuestions);
  };
  const questionChange = (question) => {
    if (!question) return;
    const newQuestions = myQuestions.map((q) => {
      if (q.id == question.id) {
        return { ...question };
      }
      return q;
    });
    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  };

  const deleteQuestion = (question) => {
    const newQuestions = myQuestions.filter((q) => q.id !== question.id);

    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  };

  useEffect(() => {
    setMyQuestions(questions);
  }, [questions]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="">Questions</h3>
        <button
          type="button"
          className="btn btn-dark "
          onClick={() => addQuestion()}
        >
          <i className="bi bi-plus"></i>
          Add question
        </button>
      </div>
      {myQuestions.length ? (
        myQuestions.map((q, ind) => (
          <QuestionEditor
            key={q.id}
            index={ind}
            question={q}
            questionChange={questionChange}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))
      ) : (
        <div className="text-gray-400 text-center py-4">
          You don't have any questions created
        </div>
      )}
    </>
  );
}
