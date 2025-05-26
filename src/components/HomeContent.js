import { useNavigate } from "react-router-dom";

function HomeContent() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h2 className="display-4">Welcome to the Quizz App!</h2>
        <p className="lead">
          Explore the features designed for Principals, Teachers, and Students.
        </p>
        <p className="lead">
          To login as principal use username :Amaresha password:Amaresha@123
        </p>
        <hr className="my-4" />

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Principal Features</h5>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-person-badge me-2"></i>View all teacher
                    profiles.
                  </li>
                  <li>
                    <i className="bi bi-file-earmark-text me-2"></i>See tests
                    created by teachers.
                  </li>
                  {/* Add more principal features here */}
                </ul>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    navigate("/PrincipalLogin");
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">Teacher Features</h5>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-plus-square me-2"></i>Create new tests.
                  </li>
                  <li>
                    <i className="bi bi-pencil-square me-2"></i>Edit existing
                    tests.
                  </li>
                  <li>
                    <i className="bi bi-trash me-2"></i>Delete tests.
                  </li>
                  <li>
                    <i className="bi bi-graph-up me-2"></i>View latest student
                    scores.
                  </li>
                  {/* Add more teacher features here */}
                </ul>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    navigate("/TeacherLogin");
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-info">Student Features</h5>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-clipboard-check me-2"></i>View your test
                    scores.
                  </li>
                  <li>
                    <i className="bi bi-play-circle me-2"></i>Take available
                    tests.
                  </li>
                  {/* Add more student features here */}
                </ul>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    navigate("/StudentLogin");
                  }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-muted">
          This application aims to streamline the quizzing process for
          educational institutions.
        </p>
      </div>
    </div>
  );
}

export default HomeContent;
