import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/useStateContext";
import axiosClient from "../axios-client";
import QuizQuestions from "../components/QuizQuestions";

export default function QuizView() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [quiz, setQuiz] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });

  const onImageChoose = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setQuiz({
        ...quiz,
        image: file,
        image_url: reader.result,
      });

      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...quiz };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/quiz/${id}`, payload);
    } else {
      res = axiosClient.post("/quiz", payload);
    }

    res
      .then((res) => {
        console.log(res);
        navigate("/quizzes");
        if (id) {
          showToast("The quiz was updated");
        } else {
          showToast("The quiz was created");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
        console.log(err, err.response);
      });
  };

  function onQuestionsUpdate(questions) {
    setQuiz({
      ...quiz,
      questions,
    });
  }

  const onDelete = () => {};

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/quiz/${id}`).then(({ data }) => {
        setQuiz(data.data);
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      {loading && <p>loading</p>}
      {!loading && (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className=" container-fluid p-5">
            {error && (
              <div className="bg-danger text-light px-2 py-3 rounded-3">
                {error}
              </div>
            )}
            {/*Image */}

            <div>
              <label className="">Photo</label>
              <div className="mt-1 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center">
                  {quiz.image_url && (
                    <img src={quiz.image_url} className=" border" />
                  )}
                  {!quiz.image_url && (
                    <span className="d-flex justify-content-center align-items-center ">
                      <i className="bi bi-image fs-1 "></i>
                    </span>
                  )}
                </div>
                <div className="input-group ms-5">
                  <label
                    className="input-group-text rounded-1 btn btn-secondary"
                    htmlFor="image"
                    style={{ cursor: "pointer" }}
                  >
                    Change
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className=" form-control d-none"
                    onChange={onImageChoose}
                  />
                </div>
              </div>
            </div>
            {/*Image */}
            {/*Title*/}
            <div className="">
              <label htmlFor="title" className="form-label">
                quiz Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={quiz.title}
                onChange={(ev) => setQuiz({ ...quiz, title: ev.target.value })}
                placeholder="quiz Title"
                className="form-control"
              />
            </div>
            {/*Title*/}
            {/*Description*/}
            <div className="">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              {/* <pre>{ JSON.stringify(quiz, undefined, 2) }</pre> */}
              <textarea
                name="description"
                id="description"
                value={quiz.description || ""}
                onChange={(ev) =>
                  setQuiz({ ...quiz, description: ev.target.value })
                }
                placeholder="Describe your quiz"
                className="form-control"
              ></textarea>
            </div>
            {/*Description*/}
            {/*Expire Date*/}
            <div className="">
              <label htmlFor="expire_date" className="form-label">
                Expire Date
              </label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                value={quiz.expire_date}
                onChange={(ev) =>
                  setQuiz({ ...quiz, expire_date: ev.target.value })
                }
                className="form-control"
              />
            </div>
            {/*Expire Date*/}
            {/*Active*/}
            <div className="form-check d-flex ">
              <div className="d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={quiz.status}
                  onChange={(ev) =>
                    setQuiz({ ...quiz, status: ev.target.checked })
                  }
                />
                <label className="form-check-label" htmlFor="status">
                  Active
                </label>
              </div>
              <p className="form-text text-muted">
                Whether to make quiz publicly available
              </p>
            </div>

            {/*Active*/}

            <QuizQuestions
              questions={quiz.questions}
              onQuestionsUpdate={onQuestionsUpdate}
            />

            <button
              className="btn mt-5"
              style={{ backgroundColor: "#5b08a7", color: "#fff" }}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
}
