import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUrl } from "../../context/StoreContext";

function TeacherSignup() {
  const { baseURL } = useUrl();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Teacher Signup submitted:", {
      firstName,
      lastName,
      username,
      password,
      email,
      subject,
      age,
      salary,
      gender,
    });

    try {
      const response = await fetch(`${baseURL}/api/teachers`, {
        // Replace with your backend API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          email,
          subject,
          age,
          salary,
          gender,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("teacher data inserted:", data);
        alert("signed up succesfully");
        // Optionally clear the form
      } else {
        const errorData = await response.json();
        alert("error occured");
        console.error("Error creating user:", errorData);
      }
    } catch (error) {
      alert("error occured");
      console.error("Fetch error:", error);
    }
    // Optionally reset the form:
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setSubject("");
    setAge("");
    setSalary("");
    setGender("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Teacher Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
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
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    value={age}
                    onChange={handleAgeChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salary:
                  </label>
                  <input
                    className="form-control"
                    id="salary"
                    value={salary}
                    onChange={handleSalaryChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender:
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
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

export default TeacherSignup;
