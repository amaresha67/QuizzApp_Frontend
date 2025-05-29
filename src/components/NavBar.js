import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Includes Popper

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm py-3">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fs-3 fw-bold text-warning" to="/">
          Quizzo
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarRoles"
          aria-controls="navbarRoles"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible section */}
        <div className="collapse navbar-collapse" id="navbarRoles">
          <div className="d-lg-flex ms-auto gap-4 text-center">
            {/* Principal */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-2 text-light my-2 my-lg-0">
              <span className="fw-semibold">Principal:</span>
              <Link
                to="/PrincipalLogin"
                className="btn btn-sm btn-outline-light"
              >
                Login
              </Link>
            </div>

            {/* Teacher */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-2 text-light my-2 my-lg-0">
              <span className="fw-semibold">Teacher:</span>
              <Link to="/TeacherLogin" className="btn btn-sm btn-outline-light">
                Login
              </Link>
              <Link
                to="/TeacherSignUp"
                className="btn btn-sm btn-outline-light"
              >
                Signup
              </Link>
            </div>

            {/* Student */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-2 text-light my-2 my-lg-0">
              <span className="fw-semibold">Student:</span>
              <Link to="/StudentLogin" className="btn btn-sm btn-outline-light">
                Login
              </Link>
              <Link
                to="/StudentSignUp"
                className="btn btn-sm btn-outline-light"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
