import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Includes Popper
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const StudentDashboard = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Student Dashboard</span>

          {/* Toggle for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-outline-light me-2">
                  <Link to="./" className="text-decoration-none text-reset">
                    Home
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light">
                  <Link
                    to="../"
                    className="text-decoration-none text-reset"
                    onClick={() => {
                      localStorage.removeItem("studentInfo");
                      localStorage.removeItem("token");
                    }}
                  >
                    Logout
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default StudentDashboard;
