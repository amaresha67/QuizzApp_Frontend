import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUrl } from "../../context/StoreContext";
const PNotification = () => {
  const { baseURL } = useUrl();
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${baseURL}/api/teachers/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log(data.teachersData);
      console.log(response);
      setTeachers(data.teachersData);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  const handleAction = async (teacherId, allowStatus) => {
    try {
      const response = await fetch(`${baseURL}/api/teachers/updateAllow`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherId,
          allow: allowStatus,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Re-fetch teachers after update
      fetchTeachers();
    } catch (err) {
      console.error("Error updating teacher status:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Pending Teacher Approvals</h3>
      {teachers.length === 0 ? (
        <div className="alert alert-info">No pending requests</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              {" "}
              <th>Name</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.teacher_id}>
                <td>{teacher.first_name}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.email}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(teacher.teacher_id, "yes")}
                  >
                    Allow
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction(teacher.teacher_id, "no")}
                  >
                    Don't Allow
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PNotification;
