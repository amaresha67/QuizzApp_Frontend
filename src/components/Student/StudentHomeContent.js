import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../context/StoreContext";

const StudentHomeContent = ({ setTestId, testId }) => {
  const { baseURL } = useUrl();
  const [data, setData] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [subjects, setSubjects] = useState([]);
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
  const navigate = useNavigate();
  const [student] = useState({
    name: studentInfo.first_name,
    email: studentInfo.email,
    class: studentInfo.class,
    student_id: studentInfo.roll_number,
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${baseURL}/api/tests/getTests/${student.student_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await res.json();
        const tests = result;
        console.log("result", result);
        setData(tests);
        setFilteredTests(tests);
        const subs1 = [
          "All",
          ...new Set(tests.completedTests?.map((test) => test.subject)),
        ];
        const subs2 = [
          ...new Set(tests.unCompletedTests?.map((test) => test.subject)),
        ];

        setSubjects([...new Set([...subs1, ...subs2])]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, []);

  // const now = new Date();

  const completedTests = filteredTests.completedTests;
  const uncompletedTests = filteredTests.unCompletedTests;

  useEffect(() => {
    if (!data.completedTests || !data.unCompletedTests) return;

    if (selectedSubject === "All") {
      setFilteredTests(data);
    } else {
      const filtered = {
        completedTests: data.completedTests.filter(
          (test) => test.subject === selectedSubject
        ),
        unCompletedTests: data.unCompletedTests.filter(
          (test) => test.subject === selectedSubject
        ),
      };
      setFilteredTests(filtered);
    }
  }, [selectedSubject, data]);

  console.log(" comple", completedTests);
  console.log(" complehkdsf", uncompletedTests);
  console.log("subjects", subjects);
  const handleTakeTest = (test_id) => {
    console.log("inside taketest edit", test_id);
    setTestId(test_id);
    navigate("/StudentDashboard/TakeTest");
  };

  const TestListSection = ({ title, tests }) => (
    <div className="mb-5">
      <h4 className="mb-3">{title}</h4>
      <div className="list-group">
        <div className="list-group-item bg-light fw-bold d-flex text-center">
          <div className="col-2">Title</div>
          <div className="col-2">Created At</div>
          <div className="col-3">Scheduled At</div>
          <div className="col-2">Duration</div>
          <div className="col-3">
            {title == "Uncompleted Tests" ? "Actions" : "Scores"}
          </div>
        </div>

        {tests ? (
          tests.map((test) => (
            <div
              key={test.test_id}
              className="list-group-item d-flex align-items-center text-center"
            >
              <div className="col-2">{test.title}</div>
              <div className="col-2">{test.created_at}</div>
              <div className="col-3">{test.scheduled_at}</div>
              <div className="col-2">{test.duration}</div>
              <div className="col-3">
                {title == "Uncompleted Tests" ? (
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleTakeTest(test.test_id)}
                  >
                    Start Test
                  </button>
                ) : (
                  <p>{test.score}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="list-group-item text-center">
            No {title.toLowerCase()}.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      {/* Teacher Profile */}
      <div className="mb-4 p-3 border rounded shadow-sm bg-white">
        <h4 className="mb-3">Student Profile</h4>
        <p>
          <strong>Name:</strong> {student.name}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Class:</strong> {student.class}
        </p>
      </div>

      {/* Filter by Class */}
      <div className="col-md-6 mb-3">
        <label htmlFor="subjectFilter" className="form-label fw-bold">
          Filter by Subject:
        </label>
        <select
          id="subjectFilter"
          className="form-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {/* Test Sections */}
      <TestListSection title="Uncompleted Tests" tests={uncompletedTests} />
      <TestListSection title="Completed Tests" tests={completedTests} />
    </div>
  );
};

export default StudentHomeContent;
