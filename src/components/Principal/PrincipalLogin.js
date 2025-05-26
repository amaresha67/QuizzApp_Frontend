import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrincipalLogin() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/principal/login",
        {
          // Replace with your backend API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            password,
          }),
        }
      );
      console.log("status", response.status);
      if (response.ok) {
        if (response.status === 201) {
          const data = await response.json();
          alert("signed in successfully");
          localStorage.setItem("principalInfo", JSON.stringify(data.userData));
          localStorage.setItem("token", data.token);
          navigate("/PrincipalDashboard");
        } else {
          alert("user not exist");
        }
      } else {
        const errorData = await response.json();
        alert("Error occurred");
        console.error("Error creating user:", errorData);
      }
    } catch (error) {
      alert("error occured");
      console.error("Fetch error:", error);
    }

    // Optionally reset the form:
    setUserName("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Principal Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    UserName:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    value={userName}
                    onChange={handleUserNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
