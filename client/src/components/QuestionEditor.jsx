import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStateContext } from "../../context/useStateContext";
import AccessUsers from "./AccessUsers";
export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) {
  const [model, setModel] = useState({ ...question });
  const { questionTypes } = useStateContext();

  useEffect(() => {
    questionChange(model);
  }, [model]);

  function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function shouldHaveOptions(type = null) {
    type = type || model.type;
    return ["select", "radio", "checkbox"].includes(type);
  }

  function onTypeChange(ev) {
    const newModel = {
      ...model,
      type: ev.target.value,
    };
    if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
      if (!model.data.options) {
        newModel.data = {
          options: [{ uuid: uuidv4(), text: "" }],
        };
      }
    }
    setModel(newModel);
  }

  function addOption() {
    model.data.options.push({
      uuid: uuidv4(),
      text: "",
    });
    setModel({ ...model });
  }

  function deleteOption(op) {
    model.data.options = model.data.options.filter(
      (option) => option.uuid != op.uuid
    );
    setModel({ ...model });
  }

  return (
    <>
      <div className="shadow p-2 mt-3 rounded-3">
        <div className="d-flex justify-content-between mb-3">
          <h4>
            {index + 1}. {model.question}
          </h4>
          <div className="d-flex gap-3 align-items-center">
            <button
              type="button"
              className="btn btn-dark d-flex align-items-center py-1 px-3 mr-2"
              onClick={() => addQuestion(index + 1)}
            >
              <i className="bi bi-plus"></i>
              add
            </button>
            <button
              type="button"
              className="
              btn btn-danger
            d-flex
            align-items-center
            py-1
            px-3
            rounded-3
          "
              onClick={() => deleteQuestion(question)}
            >
              <i className="bi bi-trash3-fill"></i>
              Delete
            </button>
          </div>
        </div>
        <div className="d-flex gap-3 justify-content-between mb-3">
          {/* Question Text */}
          <div className="flex-grow-1">
            <label
              htmlFor="question"
              className="d-block text-sm fw-semibold text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              value={model.question}
              onChange={(ev) =>
                setModel({ ...model, question: ev.target.value })
              }
              className="mt-1 d-block w-100 rounded-3 shadow-sm "
            />
          </div>
          {/* Question Text */}

          {/* Question Type */}
          <div>
            <label htmlFor="questionType" className="d-block ">
              Question Type
            </label>
            <select
              id="questionType"
              name="questionType"
              value={model.type}
              onChange={onTypeChange}
              className="mt-1 d-block w-100 rounded-md py-2 px-3 shadow-sm"
            >
              {questionTypes.map((type) => (
                <option value={type} key={type}>
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>
          </div>
          {/* Question Type */}
        </div>
        {/*Description*/}
        <div className="mb-3">
          <label htmlFor="questionDescription" className="d-block">
            Description
          </label>
          <textarea
            name="questionDescription"
            id="questionDescription"
            value={model.description || ""}
            onChange={(ev) =>
              setModel({ ...model, description: ev.target.value })
            }
            className="mt-1 d-block w-100"
          ></textarea>
        </div>
        {/*Description*/}
        <div>
          {shouldHaveOptions() && (
            <div>
              <h4 className="fw-semibold mb-1 d-flex justify-content-between align-items-center ">
                Options
                <button
                  onClick={addOption}
                  type="button"
                  className=" btn btn-dark d-flex
                align-items-center
            
                py-1
                px-2
                rounded-sm"
                >
                  Add
                </button>
              </h4>

              {model.data.options.length === 0 && (
                <div className="text-xs text-gray-600 text-center py-3">
                  You don't have any options defined
                </div>
              )}
              {model.data.options.length > 0 && (
                <div>
                  {model.data.options.map((op, ind) => (
                    <div
                      key={op.uuid}
                      className="d-flex align-items-center mb-1"
                    >
                      <span>{ind + 1}.</span>
                      <input
                        type="text"
                        value={op.text}
                        onInput={(ev) => {
                          op.text = ev.target.value;
                          setModel({ ...model });
                        }}
                        className="w-full
                      rounded-sm
                      py-1
                      px-2
                      text-xs
                      border border-gray-300
                      focus:border-indigo-500"
                      />
                      <button
                        onClick={(ev) => deleteOption(op)}
                        type="button"
                        className=" 
                        btn btn-danger d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {model.type === "select" && <div></div>}
      </div>
    </>
  );
}
