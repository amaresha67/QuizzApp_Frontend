import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useUrl } from "../../context/StoreContext";

const TeacherHomeContent = ({ setTestId, testId }) => {
  const { baseURL } = useUrl();
  console.log("testid", testId);
  const [data, setData] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedClass, setSelectedClass] = useState("All");
  const [classes, setClasses] = useState([]);
  const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo"));
  const navigate = useNavigate();
  const [teacher] = useState({
    name: teacherInfo.first_name,
    email: teacherInfo.email,
    subject: teacherInfo.subject,
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${baseURL}/api/tests/getTests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        const tests = result.tests;

        setData(tests);
        setFilteredTests(tests);

        const uniqueClasses = [
          "All",
          ...new Set(tests.map((test) => test.class)),
        ];
        setClasses(uniqueClasses);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, []);

  const now = new Date();

  const completedTests = filteredTests.filter(
    (test) => new Date(test.scheduled_at) < now
  );
  const uncompletedTests = filteredTests.filter(
    (test) => new Date(test.scheduled_at) >= now
  );

  const handleEditTest = (test_id) => {
    console.log("inside edit", test_id);
    setTestId(test_id);
    navigate("/TeacherDashboard/TestEdit");
  };

  const handleClassFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);

    if (selected === "All") {
      setFilteredTests(data);
    } else {
      setFilteredTests(data.filter((test) => test.class === selected));
    }
  };

  const handleDeleteTest = async (e, test_id) => {
    try {
      const response = await fetch(
        `${baseURL}/api/tests/deleteTest/${test_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        alert("Deleted successfully");
        setData((prev) => prev.filter((test) => test.test_id !== test_id));
        setFilteredTests((prev) =>
          prev.filter((test) => test.test_id !== test_id)
        );
      } else {
        const errorData = await response.json();
        alert("Error occurred while deleting");
        console.error("Delete error:", errorData);
      }
    } catch (error) {
      alert("Fetch error while deleting");
      console.error("Fetch error:", error);
    }
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
          <div className="col-3">Actions</div>
        </div>

        {tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test.test_id}
              className="list-group-item d-flex align-items-center text-center"
            >
              <div className="col-2">{test.title}</div>

              <div className="col-3">
                {new Date(test.created_at).toLocaleString()}
              </div>
              <div className="col-3">
                {new Date(test.scheduled_at).toLocaleString()}
              </div>
              <div className="col-2">{test.duration}</div>
              <div className="col-3">
                {title == "Uncompleted Tests" && (
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditTest(test.test_id)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => handleDeleteTest(e, test.test_id)}
                >
                  Delete
                </button>
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
        <h4 className="mb-3">Teacher Profile</h4>
        <p>
          <strong>Name:</strong> {teacher.name}
        </p>
        <p>
          <strong>Email:</strong> {teacher.email}
        </p>
        <p>
          <strong>Subject:</strong> {teacher.subject}
        </p>
      </div>

      {/* Create Test Button */}
      <div className="mb-4">
        <Link to="/TeacherDashboard/CreateTest" className="btn btn-success">
          + Create New Test
        </Link>
      </div>
      <div className="col-md-4">
        <div className="card h-100">
          <div className="card-body">
            <Bell size={32} className="text-warning mb-3" />
            <h5 className="card-title">View Notifications</h5>
            <p className="card-text">
              Stay up to date with recent alerts and allow Students to signin.
            </p>
            <button className="btn btn-outline-warning">
              <Link
                to="/TeacherDashboard/Notifications"
                className="text-decoration-none text-reset"
              >
                View Notifications
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Filter by Class */}
      <div className="mb-4">
        <label htmlFor="classFilter" className="form-label fw-bold">
          Filter by Class:
        </label>
        <select
          id="classFilter"
          className="form-select w-50"
          value={selectedClass}
          onChange={handleClassFilterChange}
        >
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
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

export default TeacherHomeContent;
