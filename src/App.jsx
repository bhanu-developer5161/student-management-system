import "./App.css";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Students from "./components/Students";
import Attendance from "./components/Attendance";
import Marks from "./components/Marks";
import Courses from "./components/Courses";
import Departments from "./components/Departments";
import Reports from "./components/Reports";


function App() {

  const [activePage, setActivePage] =
    useState("dashboard");


  const [stats, setStats] = useState({

    students: 0,
    courses: 0,
    departments: 0,

    averageAttendance: 0,
    goodAttendance: 0,
    improvementAttendance: 0,
    lowAttendance: 0,

    averageMarks: 0,
    marksStudents: 0,
    passedStudents: 0,
    failedStudents: 0,

  });


  /* =========================================
     LOAD DASHBOARD DATA
  ========================================== */

  const loadDashboardStats = () => {

    try {

      /* =========================
         STUDENTS
      ========================== */

      const students =
        JSON.parse(
          localStorage.getItem("students")
        ) || [];


      /* =========================
         COURSES
      ========================== */

      const courses =
        JSON.parse(
          localStorage.getItem("courses")
        ) || [];


      /* =========================
         DEPARTMENTS
      ========================== */

      const departments =
        JSON.parse(
          localStorage.getItem("departments")
        ) || [];


      /* =================================
         ATTENDANCE STATISTICS
      ================================= */

      let totalAttendance = 0;

      let goodAttendance = 0;

      let improvementAttendance = 0;

      let lowAttendance = 0;


      students.forEach((student) => {

        const attendance =
          Number(student.attendance || 0);


        totalAttendance += attendance;


        /* 75% or above */

        if (attendance >= 75) {

          goodAttendance++;

        }


        /* 60% - 74% */

        else if (attendance >= 60) {

          improvementAttendance++;

        }


        /* Below 60% */

        else {

          lowAttendance++;

        }

      });


      const averageAttendance =
        students.length > 0

          ? Math.round(
              totalAttendance /
                students.length
            )

          : 0;


      /* =================================
         MARKS STATISTICS
      ================================= */

      let totalMarks = 0;

      let passedStudents = 0;

      let failedStudents = 0;


      students.forEach((student) => {

        const python =
          Number(
            student.marks?.python || 0
          );


        const javascript =
          Number(
            student.marks?.javascript || 0
          );


        const database =
          Number(
            student.marks?.database || 0
          );


        const webDevelopment =
          Number(
            student.marks?.webDevelopment || 0
          );


        /* Calculate total */

        const total =
          python +
          javascript +
          database +
          webDevelopment;


        /* Calculate average */

        const average =
          Math.round(total / 4);


        totalMarks += average;


        /* Passing mark = 50% */

        if (average >= 50) {

          passedStudents++;

        }

        else {

          failedStudents++;

        }

      });


      const averageMarks =
        students.length > 0

          ? Math.round(
              totalMarks /
                students.length
            )

          : 0;


      /* =================================
         UPDATE DASHBOARD
      ================================= */

      setStats({

        students:
          students.length,

        courses:
          courses.length,

        departments:
          departments.length,

        averageAttendance,

        goodAttendance,

        improvementAttendance,

        lowAttendance,

        averageMarks,

        marksStudents:
          students.length,

        passedStudents,

        failedStudents,

      });


    }

    catch (error) {

      console.error(
        "Dashboard data error:",
        error
      );

    }

  };


  /* =========================================
     INITIAL LOAD
  ========================================== */

  useEffect(() => {

    loadDashboardStats();

  }, []);


  /* =========================================
     REFRESH WHEN PAGE CHANGES
  ========================================== */

  useEffect(() => {

    loadDashboardStats();

  }, [activePage]);


  /* =========================================
     DASHBOARD
  ========================================== */

  const renderDashboard = () => {

    return (

      <>

        {/* =================================
            WELCOME
        ================================== */}

        <div className="mb-4">

          <h2>
            Welcome Back, Admin 👋
          </h2>

          <p className="text-muted">
            Here's what's happening with
            your students today.
          </p>

        </div>


        {/* =================================
            MAIN STATISTICS
        ================================== */}

        <div className="row">


          {/* TOTAL STUDENTS */}

          <div className="col-lg-4 col-md-6 mb-4">

            <div className="stat-card">

              <div>

                <p>
                  Total Students
                </p>

                <h2>
                  {stats.students}
                </h2>

                <small className="text-muted">
                  Registered students
                </small>

              </div>

              <div className="stat-icon">
                👨‍🎓
              </div>

            </div>

          </div>


          {/* TOTAL COURSES */}

          <div className="col-lg-4 col-md-6 mb-4">

            <div className="stat-card">

              <div>

                <p>
                  Total Courses
                </p>

                <h2>
                  {stats.courses}
                </h2>

                <small className="text-muted">
                  Available courses
                </small>

              </div>

              <div className="stat-icon">
                📚
              </div>

            </div>

          </div>


          {/* DEPARTMENTS */}

          <div className="col-lg-4 col-md-6 mb-4">

            <div className="stat-card">

              <div>

                <p>
                  Departments
                </p>

                <h2>
                  {stats.departments}
                </h2>

                <small className="text-muted">
                  Academic departments
                </small>

              </div>

              <div className="stat-icon">
                🏢
              </div>

            </div>

          </div>

        </div>


        {/* =================================
            ATTENDANCE OVERVIEW
        ================================== */}

        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h4>
                  📋 Attendance Overview
                </h4>

                <p className="text-muted">
                  Current attendance performance.
                </p>

              </div>


              <button
                className="btn btn-primary"
                onClick={() =>
                  setActivePage("attendance")
                }
              >
                Manage Attendance
              </button>

            </div>


            <div className="row mt-3">


              {/* AVERAGE ATTENDANCE */}

              <div className="col-md-3 mb-3">

                <div className="card border-primary">

                  <div className="card-body text-center">

                    <h6>
                      Average Attendance
                    </h6>

                    <h2 className="text-primary">
                      {stats.averageAttendance}%
                    </h2>

                  </div>

                </div>

              </div>


              {/* GOOD ATTENDANCE */}

              <div className="col-md-3 mb-3">

                <div className="card border-success">

                  <div className="card-body text-center">

                    <h6>
                      Good Attendance
                    </h6>

                    <h2 className="text-success">
                      {stats.goodAttendance}
                    </h2>

                    <small>
                      75%+
                    </small>

                  </div>

                </div>

              </div>


              {/* NEED IMPROVEMENT */}

              <div className="col-md-3 mb-3">

                <div className="card border-warning">

                  <div className="card-body text-center">

                    <h6>
                      Need Improvement
                    </h6>

                    <h2 className="text-warning">
                      {stats.improvementAttendance}
                    </h2>

                    <small>
                      60% - 74%
                    </small>

                  </div>

                </div>

              </div>


              {/* LOW ATTENDANCE */}

              <div className="col-md-3 mb-3">

                <div className="card border-danger">

                  <div className="card-body text-center">

                    <h6>
                      Low Attendance
                    </h6>

                    <h2 className="text-danger">
                      {stats.lowAttendance}
                    </h2>

                    <small>
                      Below 60%
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================
            MARKS OVERVIEW
        ================================== */}

        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h4>
                  📝 Academic Performance
                </h4>

                <p className="text-muted">
                  Student marks and academic
                  performance.
                </p>

              </div>


              <button
                className="btn btn-warning"
                onClick={() =>
                  setActivePage("marks")
                }
              >
                Manage Marks
              </button>

            </div>


            <div className="row mt-3">


              {/* AVERAGE MARKS */}

              <div className="col-md-3 mb-3">

                <div className="card border-primary">

                  <div className="card-body text-center">

                    <h6>
                      Average Marks
                    </h6>

                    <h2 className="text-primary">
                      {stats.averageMarks}/100
                    </h2>

                  </div>

                </div>

              </div>


              {/* TOTAL STUDENTS */}

              <div className="col-md-3 mb-3">

                <div className="card border-info">

                  <div className="card-body text-center">

                    <h6>
                      Total Students
                    </h6>

                    <h2 className="text-info">
                      {stats.marksStudents}
                    </h2>

                  </div>

                </div>

              </div>


              {/* PASSED */}

              <div className="col-md-3 mb-3">

                <div className="card border-success">

                  <div className="card-body text-center">

                    <h6>
                      Passed Students
                    </h6>

                    <h2 className="text-success">
                      {stats.passedStudents}
                    </h2>

                  </div>

                </div>

              </div>


              {/* FAILED */}

              <div className="col-md-3 mb-3">

                <div className="card border-danger">

                  <div className="card-body text-center">

                    <h6>
                      Failed Students
                    </h6>

                    <h2 className="text-danger">
                      {stats.failedStudents}
                    </h2>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================
            MANAGEMENT CARDS
        ================================== */}

        <div className="row">


          {/* STUDENTS */}

          <div className="col-md-6 col-lg-3 mb-4">

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <h5>
                  👨‍🎓 Students
                </h5>

                <p className="text-muted">
                  Manage student records
                  and profiles.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setActivePage("students")
                  }
                >
                  Manage Students
                </button>

              </div>

            </div>

          </div>


          {/* ATTENDANCE */}

          <div className="col-md-6 col-lg-3 mb-4">

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <h5>
                  📋 Attendance
                </h5>

                <p className="text-muted">
                  Track student attendance.
                </p>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    setActivePage("attendance")
                  }
                >
                  View Attendance
                </button>

              </div>

            </div>

          </div>


          {/* COURSES */}

          <div className="col-md-6 col-lg-3 mb-4">

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <h5>
                  📚 Courses
                </h5>

                <p className="text-muted">
                  Manage available courses.
                </p>

                <button
                  className="btn btn-info"
                  onClick={() =>
                    setActivePage("courses")
                  }
                >
                  Manage Courses
                </button>

              </div>

            </div>

          </div>


          {/* DEPARTMENTS */}

          <div className="col-md-6 col-lg-3 mb-4">

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <h5>
                  🏢 Departments
                </h5>

                <p className="text-muted">
                  Manage academic departments.
                </p>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setActivePage("departments")
                  }
                >
                  Manage Departments
                </button>

              </div>

            </div>

          </div>


          {/* REPORTS */}

          <div className="col-md-6 col-lg-3 mb-4">

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <h5>
                  📊 Reports
                </h5>

                <p className="text-muted">
                  View student performance
                  and analytics.
                </p>

                <button
                  className="btn btn-dark"
                  onClick={() =>
                    setActivePage("reports")
                  }
                >
                  View Reports
                </button>

              </div>

            </div>

          </div>


        </div>


        {/* =================================
            SYSTEM INFORMATION
        ================================== */}

        <div className="card shadow-sm">

          <div className="card-body">

            <h4>
              🎓 Student Management System
            </h4>

            <p className="text-muted mb-0">
              Manage students, courses,
              attendance, marks and
              departments from one
              centralized dashboard.
            </p>

          </div>

        </div>

      </>

    );

  };


  /* =========================================
     PAGE ROUTING
  ========================================== */

  const renderPage = () => {

    switch (activePage) {

      case "students":

        return <Students />;


      case "attendance":

        return <Attendance />;


      case "marks":

        return <Marks />;


      case "courses":

        return <Courses />;


      case "departments":

        return <Departments />;


      case "reports":

        return <Reports />;


      default:

        return renderDashboard();

    }

  };


  /* =========================================
     MAIN APP
  ========================================== */

  return (

    <div className="app">


      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />


      <div className="main-content">


        {/* TOP NAVBAR */}

        <nav className="top-navbar">

          <h4>

            {activePage === "dashboard" &&
              "Dashboard"}

            {activePage === "students" &&
              "Students"}

            {activePage === "attendance" &&
              "Attendance"}

            {activePage === "marks" &&
              "Marks Management"}

            {activePage === "courses" &&
              "Course Management"}

            {activePage === "departments" &&
              "Department Management"}

            {activePage === "reports" &&
              "Reports & Analytics"}

          </h4>


          <div className="admin-profile">

            👤 Admin

          </div>

        </nav>


        {/* PAGE CONTENT */}

        <div className="dashboard-container">

          {renderPage()}

        </div>


      </div>

    </div>

  );

}


export default App;