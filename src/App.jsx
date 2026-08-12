import "./App.css";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Students from "./components/Students";
import Attendance from "./components/Attendance";
import Marks from "./components/Marks";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "students":
        return <Students />;

      case "attendance":
        return <Attendance />;

      case "marks":
        return <Marks />;

      case "dashboard":
      default:
        return (
          <>
            <h2>Welcome Back, Admin 👋</h2>

            <p className="text-muted">
              Here's what's happening with your students today.
            </p>

            <div className="row mt-4">

              {/* Total Students */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="stat-card">
                  <div>
                    <p>Total Students</p>
                    <h2>120</h2>
                  </div>

                  <div className="stat-icon">
                    👨‍🎓
                  </div>
                </div>
              </div>

              {/* Total Courses */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="stat-card">
                  <div>
                    <p>Total Courses</p>
                    <h2>8</h2>
                  </div>

                  <div className="stat-icon">
                    📚
                  </div>
                </div>
              </div>

              {/* Departments */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="stat-card">
                  <div>
                    <p>Departments</p>
                    <h2>5</h2>
                  </div>

                  <div className="stat-icon">
                    🏢
                  </div>
                </div>
              </div>

            </div>

            <div className="card shadow-sm mt-3">
              <div className="card-body">

                <h4>
                  Welcome to Student Management System
                </h4>

                <p className="text-muted">
                  Manage students, courses, attendance
                  and marks from one place.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setActivePage("students")
                  }
                >
                  Add Student
                </button>

              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-content">

        <nav className="top-navbar">

          <h4>
            {activePage === "dashboard" && "Dashboard"}

            {activePage === "students" && "Students"}

            {activePage === "attendance" && "Attendance"}

            {activePage === "marks" && "Marks Management"}
          </h4>

          <div className="admin-profile">
            👤 Admin
          </div>

        </nav>

        <div className="dashboard-container">
          {renderPage()}
        </div>

      </div>

    </div>
  );
}

export default App;