export default function PublicQuestionView({ question, index, answerChanged }) {
  let selectedOptions = [];

  function onCheckboxChange(option, $event) {
    if ($event.target.checked) {
      selectedOptions.push(option.text);
    } else {
      selectedOptions = selectedOptions.filter((op) => op != option.text);
    }
    answerChanged(selectedOptions);
  }

  return (
    <>
      <fieldset className="mb-4 shadow p-2 rounded-2 ">
        <div>
          <legend className="fs-3">
            {index + 1}. {question.question}
          </legend>
          <p className="text-muted fs-5">{question.description}</p>
        </div>

        <div className="mt-3">
          {question.type === "select" && (
            <div>
              <select
                onChange={(ev) => answerChanged(ev.target.value)}
                className=""
              >
                <option value="">Please Select</option>
                {question.data.options.map((option) => (
                  <option key={option.uuid} value={option.text}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          )}
          {question.type === "radio" && (
            <div className="form-check">
              {question.data.options.map((option, ind) => (
                <div
                  key={option.uuid}
                  className="d-flex gap-3 align-items-center"
                >
                  <input
                    id={option.uuid}
                    name={"question" + question.id}
                    value={option.text}
                    onChange={(ev) => answerChanged(ev.target.value)}
                    type="radio"
                    className="form-check-input"
                  />
                  <label htmlFor={option.uuid} className="form-check-label">
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "checkbox" && (
            <div className="form-check">
              {question.data.options.map((option, ind) => (
                <div
                  key={option.uuid}
                  className="d-flex align-items-center gap-3"
                >
                  <input
                    id={option.uuid}
                    onChange={(ev) => onCheckboxChange(option, ev)}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <label htmlFor={option.uuid} className="form-check-label">
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "text" && (
            <div>
              <input
                type="text"
                onChange={(ev) => answerChanged(ev.target.value)}
                className="fs-4"
              />
            </div>
          )}
          {question.type === "textarea" && (
            <div>
              <textarea
                onChange={(ev) => answerChanged(ev.target.value)}
                className="fs-4"
              ></textarea>
            </div>
          )}
        </div>
      </fieldset>
    </>
  );
}
