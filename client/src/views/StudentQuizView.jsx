import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicView() {
  const answers = {};
  const [quizFinished, setQuizFinished] = useState(false);
  const [quiz, setQuiz] = useState({
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`quiz/get-by-slug/${slug}`)
      .then(({ data }) => {
        setLoading(false);
        setQuiz(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  function answerChanged(question, value) {
    answers[question.id] = value;
    console.log(question, value);
  }

  function onSubmit(ev) {
    ev.preventDefault();

    console.log(answers);
    axiosClient
      .post(`/quiz/${quiz.id}/answer`, {
        answers,
      })
      .then((response) => {
        debugger;
        setQuizFinished(true);
      });
  }

  return (
    <div
      className="container
    "
    >
      {loading && (
        <div className="d-flex justify-content-center">Loading..</div>
      )}
      {!loading && (
        <form
          onSubmit={(ev) => onSubmit(ev)}
          className="container rounded-4 p-4"
        >
          <div className="d-flex justify-content-between align-items-center gap-3">
            <h1 className="mb-3">{quiz.title}</h1>
            <p className="text-dark text-sm mb-3">
              Description: {quiz.description}
            </p>
          </div>

          {quizFinished && (
            <div className="text-dark">
              Thank you for participating in the quiz
            </div>
          )}
          {!quizFinished && (
            <>
              <div>
                {quiz.questions.map((question, index) => (
                  <PublicQuestionView
                    key={question.id}
                    question={question}
                    index={index}
                    answerChanged={(val) => answerChanged(question, val)}
                  />
                ))}
              </div>
              <button type="submit" className="btn btn-dark py-2 px-4">
                Submit
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}
