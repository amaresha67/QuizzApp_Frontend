import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import PrincipalLogin from "./components/Principal/PrincipalLogin";
import HomeContent from "./components/HomeContent";
import TeacherLogin from "./components/Teacher/TeacherLogin";
import TeacherSignUp from "./components/Teacher/TeacherSignUp";
import StudentLogin from "./components/Student/StudentLogin";
import StudentSignUp from "./components/Student/StudentSignUp";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import StudentScore from "./components/Principal/StudentScore";
import AllTestView from "./components/Principal/AllTestView";
import PrincipalHomeContent from "./components/Principal/PrincipalHomeContent";
import PNotifications from "./components/Principal/PNotifications";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherHomeContent from "./components/Teacher/TeacherHomeContent";
import CreateTest from "./components/Teacher/CreateTest";
import TestEdit from "./components/Teacher/TestEdit";
import StudentHomeContent from "./components/Student/StudentHomeContent";
import StudentDashboard from "./pages/StudentDashboard";
import TakeTest from "./components/Student/TakeTest";
import TNotification from "./components/Teacher/TNotifications";
import { useState } from "react";
function App() {
  const [testId, setTestId] = useState(0);
  const [s_testId, setS_TestId] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeContent />} />
          <Route path="/TeacherLogin" element={<TeacherLogin />} />

          <Route path="/TeacherSignUp" element={<TeacherSignUp />} />

          <Route path="/StudentLogin" element={<StudentLogin />} />

          <Route path="/StudentSignUp" element={<StudentSignUp />} />
          <Route path="/PrincipalLogin" element={<PrincipalLogin />} />
        </Route>
        <Route path="/PrincipalDashboard" element={<PrincipalDashboard />}>
          <Route index element={<PrincipalHomeContent />} />
          <Route
            path="/PrincipalDashboard/StudentScore"
            element={<StudentScore />}
          />

          <Route
            path="/PrincipalDashboard/AllTestView"
            element={<AllTestView />}
          />
          <Route
            path="/PrincipalDashboard/Notifications"
            element={<PNotifications />}
          />
        </Route>
        <Route
          path="/TeacherDashboard"
          element={<TeacherDashboard setTestId={setTestId} testId={testId} />}
        >
          <Route
            index
            element={
              <TeacherHomeContent setTestId={setTestId} testId={testId} />
            }
          />
          <Route
            path="/TeacherDashboard/Notifications"
            element={<TNotification />}
          />
          <Route path="/TeacherDashboard/CreateTest" element={<CreateTest />} />
          <Route
            path="/TeacherDashboard/TestEdit"
            element={<TestEdit setTestId={setTestId} testId={testId} />}
          />
        </Route>
        <Route
          path="/StudentDashboard"
          element={
            <StudentDashboard setTestId={setS_TestId} testId={s_testId} />
          }
        >
          <Route
            index
            element={
              <StudentHomeContent setTestId={setS_TestId} testId={s_testId} />
            }
          />

          <Route
            path="/StudentDashboard/TakeTest"
            element={<TakeTest setTestId={setS_TestId} testId={s_testId} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
