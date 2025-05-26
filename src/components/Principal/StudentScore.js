import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentScores = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    class: "",
    testName: "",
    subject: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/Score/getScores", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching student scores:", error);
      setResults([]);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Fetch Student Scores</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              name="class"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              name="testName"
              placeholder="Test Name"
              value={formData.testName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2 mb-3">
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      {results.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Student Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentScores;
