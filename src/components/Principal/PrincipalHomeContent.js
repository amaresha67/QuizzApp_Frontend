import { Link } from "react-router-dom";
import { UserCircle, FileText, BarChart, Bell } from "lucide-react";

export default function Home() {
  const principalInfo = JSON.parse(localStorage.getItem("principalInfo"));

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        {/* Profile Section */}
        <div className="col-12">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <UserCircle size={48} className="me-3" />
              <div>
                <h5 className="card-title mb-1">
                  {principalInfo.first_name}
                  {principalInfo.last_name}
                </h5>
                <p className="card-text text-muted">
                  {principalInfo.first_name}
                  {principalInfo.last_name}@school.edu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <FileText size={32} className="text-primary mb-3" />
              <h5 className="card-title">View All Tests</h5>
              <p className="card-text">
                Browse all upcoming and past tests for students.
              </p>
              <button className="btn btn-outline-primary">
                <Link
                  to="/PrincipalDashboard/AllTestView"
                  className="text-decoration-none text-reset"
                >
                  Go to Tests
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <BarChart size={32} className="text-success mb-3" />
              <h5 className="card-title">View Student Scores</h5>
              <p className="card-text">
                Analyze performance and scores across classes.
              </p>
              <button className="btn btn-outline-success">
                <Link
                  to="/PrincipalDashboard/StudentScore"
                  className="text-decoration-none text-reset"
                >
                  View Scores
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <Bell size={32} className="text-warning mb-3" />
              <h5 className="card-title">View Notifications</h5>
              <p className="card-text">
                Stay up to date with recent alerts and allow Teachers to signin.
              </p>
              <button className="btn btn-outline-warning">
                <Link
                  to="/PrincipalDashboard/Notifications"
                  className="text-decoration-none text-reset"
                >
                  View Notifications
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
