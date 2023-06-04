import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicView() {
  const navigate = useNavigate();

  const answers = {};
  const [quizFinished, setQuizFinished] = useState(false);
  const [quiz, setQuiz] = useState({
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [result, setResult] = useState(0);
  const [countdown, setCountdown] = useState(5);
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

  useEffect(() => {
    axiosClient.get(`quiz/get-by-slug/${slug}`).then(({ data }) => {
      setResult(data);
      console.log(result);
    });
  });

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
        setShowLoading(true);
        let timer = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          setQuizFinished(true);
          navigate("/");
        }, 3000);
      });
  }

  return (
    <div className="container">
      {loading && (
        <div className="d-flex justify-content-center">Loading..</div>
      )}
      {!loading && !showLoading && (
        <form onSubmit={onSubmit} className="container rounded-4 p-4">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <h1 className="mb-3">{quiz.title}</h1>
            <p className="text-dark text-sm mb-3">
              Description: {quiz.description}
            </p>
          </div>

          {quizFinished && navigate("/")}
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
      {showLoading && (
        <div className="fs-4 d-flex justify-content-center align-items-center gap-4">
          <p className="mt-2">Redirect after {countdown}</p>
          <div
            className="text-center spinner-border text-primary"
            role="status"
          ></div>
        </div>
      )}
    </div>
  );
}
