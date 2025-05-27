import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUrl } from "../../context/StoreContext";

const TNotification = () => {
  const { baseURL } = useUrl();
  const [students, setTeachers] = useState([]);
  const token = localStorage.getItem("token");
  // Fetch teachers on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${baseURL}/api/students/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log(data.studentsData);
      console.log(response);
      setTeachers(data.studentsData);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleAction = async (studentId, allowStatus) => {
    try {
      const response = await fetch(`${baseURL}/api/student/updateAllow`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          allow: allowStatus,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Re-fetch teachers after update
      fetchStudents();
    } catch (err) {
      console.error("Error updating student status:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Pending Teacher Approvals</h3>
      {students.length === 0 ? (
        <div className="alert alert-info">No pending requests</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              {" "}
              <th>Name</th>
              <th>Class</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.roll_number}>
                <td>{student.first_name}</td>
                <td>{student.class}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(student.roll_number, "yes")}
                  >
                    Allow
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction(student.roll_number, "no")}
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

export default TNotification;
