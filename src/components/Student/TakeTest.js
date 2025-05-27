import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Type } from "lucide-react";
import { useUrl } from "../../context/StoreContext";

export default function TakeTest({ setTestId, testId }) {
  const { baseURL } = useUrl();
  const navigate = useNavigate();
  const [answersByStudent, setAnswersByStudent] = useState([]);
  const [testDetails, setTestDetails] = useState({
    title: "",
    subject: "",
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

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timeout, setTimeoutFlag] = useState(false);

  const [qIndex, setQIndex] = useState(0);
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${baseURL}/api/tests/getTest/${testId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        const updatedTestDetails = result.testDetails;
        const isoString = result.testDetails.scheduled_at;
        const localDatetime = new Date(isoString).toISOString().slice(0, 16);
        updatedTestDetails.scheduled_at = localDatetime;
        setTestDetails(updatedTestDetails);

        const [h, m] = updatedTestDetails.duration.split(":").map(Number);
        setHour(h);
        setMin(m - 1);
        setSec(60);

        const updated = result.questions.map((q) => ({
          questionText: q.question,
          options: [q.option_1, q.option_2, q.option_3, q.option_4],
          correctAnswerIndex: parseInt(q.answer),
        }));
        setAnswersByStudent(new Array(updated.length).fill(null));
        setQuestions(updated);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchData();
  }, [testId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec > 0) return prevSec - 1;

        if (min > 0) {
          setMin((prevMin) => prevMin - 1);
          return 59;
        }

        if (hour > 0) {
          setHour((prevHour) => prevHour - 1);
          setMin(59);
          return 59;
        }

        clearInterval(interval);
        setTimeoutFlag(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hour, min]);

  const calculateScore = () => {
    let score = 0;
    for (let index = 0; index < questions.length; index++) {
      if (questions[index].correctAnswerIndex === answersByStudent[index]) {
        score++;
      }
    }
    return score;
  };

  useEffect(() => {
    if (timeout) {
      const sc = calculateScore();
      console.log("score", sc);
      alert("test completed Time over");
      navigate("/StudentDashboard");
    }
  }, [timeout, navigate]);

  const handleSubmit = () => {
    const score = calculateScore();
    console.log("score", score);
    async function sendData() {
      try {
        const response = await fetch(`${baseURL}/api/Score/insertScore`, {
          method: "POST", // Use POST method
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify JSON data
          },
          body: JSON.stringify({
            test_id: testId,
            student_id: studentInfo.roll_number,
            score: score,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send data");
        }

        const result = await response.json();
        console.log("Server response:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    sendData();
    alert("test completed ");

    navigate("/StudentDashboard");
  };

  const handleAnswersByStudent = (oIndex) => {
    setAnswersByStudent((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[qIndex] = oIndex;
      return updatedAnswers;
    });
  };

  return (
    <div className="container p-4 bg-light border rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded mb-3">
        <h4>{testDetails.title}</h4>
        <h5>
          {String(hour).padStart(2, "0")}:{String(min).padStart(2, "0")}:
          {String(sec).padStart(2, "0")}
        </h5>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            Q{qIndex + 1}: {questions[qIndex].questionText}
          </h5>
          <ul className="list-group">
            {questions[qIndex].options.map((option, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  answersByStudent[qIndex] === index ? "active" : ""
                }`}
                onClick={() => handleAnswersByStudent(index)}
                style={{ cursor: "pointer" }}
              >
                {index + 1}. {option}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-outline-secondary"
          disabled={qIndex === 0}
          onClick={() => setQIndex(qIndex - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-secondary"
          disabled={qIndex === questions.length - 1}
          onClick={() => setQIndex(qIndex + 1)}
        >
          Next
        </button>
      </div>

      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                qIndex === index ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setQIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-success px-5" onClick={handleSubmit}>
          Submit Test
        </button>
      </div>
    </div>
  );
}
