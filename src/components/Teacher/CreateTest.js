import { useState } from "react";
import { useUrl } from "../../context/StoreContext";

const CreateTest = () => {
  const { baseURL } = useUrl();
  const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo"));

  const [testDetails, setTestDetails] = useState({
    title: "",
    subject: teacherInfo.subject,
    class: "",
    duration: "",
  });

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
    },
  ]);
  const token = localStorage.getItem("token");
  // Handle input changes for test details
  const handleTestChange = (e) => {
    const { name, value } = e.target;
    setTestDetails({ ...testDetails, [name]: value });
  };

  // Handle question text change
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  // Handle option change
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswerIndex = parseInt(value);
    setQuestions(updated);
  };

  // Add a new blank question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
      },
    ]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
     e.preventDefault(); 
    console.log(testDetails, questions);

    try {
      const response = await fetch(`${baseURL}/api/tests/addTest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testDetails,
          questions,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Test created successfully", data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  console.log(testDetails);

  return (
    <div className="container mt-4">
      <h2>Create New Test</h2>
      <form onSubmit={handleSubmit}>
        {/* Test Details */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={testDetails.title}
              onChange={handleTestChange}
              required
            />
          </div>

          <div className="col-md-6 mt-2">
            <label>Class</label>
            <input
              type="text"
              name="class"
              className="form-control"
              value={testDetails.class}
              onChange={handleTestChange}
              required
            />
          </div>
          <div className="col-md-6 mt-2">
            <label>Duration</label>
            <input
              type="time"
              name="duration"
              className="form-control"
              placeholder="hh:mm"
              value={testDetails.duration}
              onChange={handleTestChange}
              required
            />
          </div>
          <div className="col-md-6 mt-2">
            <label>Time : </label>
            <input
              type="datetime-local"
              value={testDetails.scheduled_at}
              onChange={(e) =>
                setTestDetails({ ...testDetails, scheduled_at: e.target.value })
              }
            />
          </div>
        </div>

        {/* Questions */}
        <hr />
        <h4>Questions</h4>
        {questions.map((q, qIndex) => (
          <div className="mb-4" key={qIndex}>
            <label>Question {qIndex + 1}</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter question text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              required
            />

            {q.options.map((option, oIndex) => (
              <div className="input-group mb-2" key={oIndex}>
                <div className="input-group-text">
                  <input
                    type="radio"
                    name={`correctAnswer-${qIndex}`}
                    value={oIndex}
                    checked={q.correctAnswerIndex === oIndex}
                    onChange={(e) =>
                      handleCorrectAnswerChange(qIndex, e.target.value)
                    }
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addQuestion}
        >
          + Add Question
        </button>

        <div>
          <button type="submit" className="btn btn-primary">
            Submit Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTest;
