import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand */}
        <Link className="navbar-brand fs-3 fw-bold text-warning" to="/">
          Quizzo
        </Link>

        {/* User Roles - horizontal, compact */}
        <div className="d-flex flex-wrap align-items-center gap-4 ms-auto">
          {/* Principal */}
          <div className="d-flex align-items-center gap-2 text-light">
            <span className="fw-semibold">Principal:</span>
            <Link to="/PrincipalLogin" className="btn btn-sm btn-outline-light">
              Login
            </Link>
          </div>

          {/* Teacher */}
          <div className="d-flex align-items-center gap-2 text-light">
            <span className="fw-semibold">Teacher:</span>
            <Link to="/TeacherLogin" className="btn btn-sm btn-outline-light">
              Login
            </Link>
            <Link to="/TeacherSignUp" className="btn btn-sm btn-outline-light">
              Signup
            </Link>
          </div>

          {/* Student */}
          <div className="d-flex align-items-center gap-2 text-light">
            <span className="fw-semibold">Student:</span>
            <Link to="/StudentLogin" className="btn btn-sm btn-outline-light">
              Login
            </Link>
            <Link to="/StudentSignUp" className="btn btn-sm btn-outline-light">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
