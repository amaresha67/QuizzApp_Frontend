import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUrl } from "../../context/StoreContext";

function StudentSignup() {
  const { baseURL } = useUrl();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleClassChange = (event) => {
    setStudentClass(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleFatherNameChange = (event) => {
    setFatherName(event.target.value);
  };
  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Student Signup submitted:", {
      userName,
      password,
      firstName,
      lastName,
      studentClass,
      email,
      phoneNumber,
      fatherName,
    });

    try {
      const response = await fetch(`${baseURL}/api/students`, {
        // Replace with your backend API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNumber,
          firstName,
          lastName,
          studentClass,
          email,
          phoneNumber,
          fatherName,
          userName,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("signed up succesfully");
        console.log("Student data inserted:", data);
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
    setPassword("");
    setUserName("");
    setRollNumber("");
    setFirstName("");
    setLastName("");
    setStudentClass("");
    setEmail("");
    setPhoneNumber("");
    setFatherName("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Student Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="rollnumber" className="form-label">
                    Roll Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rollnumber"
                    value={rollNumber}
                    onChange={handleRollNumberChange}
                    required
                  />
                </div>
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
                  <label htmlFor="UserName" className="form-label">
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
                    password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="fatherName" className="form-label">
                    Father Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fatherName"
                    value={fatherName}
                    onChange={handleFatherNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="class" className="form-label">
                    Class:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="class"
                    value={studentClass}
                    onChange={handleClassChange}
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
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
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

export default StudentSignup;
