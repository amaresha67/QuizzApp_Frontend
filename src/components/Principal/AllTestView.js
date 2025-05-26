import { useEffect, useState } from "react";
const ViewAllTest = () => {
  const [data, setData] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/api/tests/getTests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        const tests = result.tests;

        setData(tests);
        setFilteredTests(tests);

        setClasses(["All", ...new Set(tests.map((test) => test.class))]);
        setSubjects(["All", ...new Set(tests.map((test) => test.subject))]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (selectedClass !== "All") {
      filtered = filtered.filter((test) => test.class === selectedClass);
    }

    if (selectedSubject !== "All") {
      filtered = filtered.filter((test) => test.subject === selectedSubject);
    }

    setFilteredTests(filtered);
  }, [selectedClass, selectedSubject, data]);

  const now = new Date();

  const completedTests = filteredTests.filter(
    (test) => new Date(test.scheduled_at) < now
  );
  const uncompletedTests = filteredTests.filter(
    (test) => new Date(test.scheduled_at) >= now
  );

  const TestListSection = ({ title, tests }) => (
    <div className="mb-5">
      <h4 className="mb-3">{title}</h4>
      <div className="list-group">
        {/* Table Header */}
        <div className="list-group-item bg-light fw-bold d-flex text-center">
          <div className="col-3">Title</div>
          <div className="col-3">Created At</div>
          <div className="col-3">Scheduled At</div>
          <div className="col-3">Duration</div>
        </div>

        {/* Test Rows */}
        {tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test.test_id}
              className="list-group-item d-flex text-center"
            >
              <div className="col-3">{test.title}</div>

              <div className="col-3">
                {new Date(test.created_at).toLocaleString()}
              </div>
              <div className="col-3">
                {new Date(test.scheduled_at).toLocaleString()}
              </div>

              <div className="col-3">{test.duration}</div>
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
      <h2 className="mb-4">View All Tests</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label htmlFor="classFilter" className="form-label fw-bold">
            Filter by Class:
          </label>
          <select
            id="classFilter"
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
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
      </div>

      {/* Uncompleted Tests */}
      <TestListSection title="Uncompleted Tests" tests={uncompletedTests} />

      {/* Completed Tests */}
      <TestListSection title="Completed Tests" tests={completedTests} />
    </div>
  );
};

export default ViewAllTest;
