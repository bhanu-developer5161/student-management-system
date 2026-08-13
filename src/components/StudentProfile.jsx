import React from "react";

/* =========================================
   GET AVERAGE MARKS
========================================= */

const getAverageMarks = (marks) => {
  if (!marks) {
    return 0;
  }

  const values = [
    Number(marks.python || 0),
    Number(marks.database || 0),
    Number(marks.webDevelopment || 0),
    Number(marks.javascript || 0),
  ];

  const total = values.reduce(
    (sum, mark) => sum + mark,
    0
  );

  return Math.round(total / values.length);
};


/* =========================================
   GET GRADE
========================================= */

const getGrade = (mark) => {
  const score = Number(mark || 0);

  if (score >= 90) {
    return "A+";
  }

  if (score >= 80) {
    return "A";
  }

  if (score >= 70) {
    return "B";
  }

  if (score >= 60) {
    return "C";
  }

  if (score >= 50) {
    return "D";
  }

  return "F";
};


/* =========================================
   GET GRADE CLASS
========================================= */

const getGradeClass = (mark) => {
  const score = Number(mark || 0);

  if (score >= 70) {
    return "bg-success";
  }

  if (score >= 50) {
    return "bg-warning text-dark";
  }

  return "bg-danger";
};


/* =========================================
   GET PERFORMANCE
========================================= */

const getPerformance = (mark) => {
  const score = Number(mark || 0);

  if (score >= 80) {
    return "Excellent";
  }

  if (score >= 60) {
    return "Good";
  }

  if (score >= 50) {
    return "Average";
  }

  return "Poor";
};


/* =========================================
   GET ATTENDANCE STATUS
========================================= */

const getAttendanceStatus = (attendance) => {
  const score = Number(attendance || 0);

  if (score >= 75) {
    return {
      text: "Good",
      className: "bg-success",
    };
  }

  if (score >= 60) {
    return {
      text: "Needs Improvement",
      className: "bg-warning text-dark",
    };
  }

  return {
    text: "Low",
    className: "bg-danger",
  };
};


/* =========================================
   STUDENT PROFILE
========================================= */

function StudentProfile({ student, onBack }) {

  /* =========================================
     STUDENT NOT FOUND
  ========================================== */

  if (!student) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">

          <div
            style={{
              fontSize: "50px",
            }}
          >
            👤
          </div>

          <h4 className="mt-3">
            Student Not Found
          </h4>

          <p className="text-muted">
            The selected student could not be found.
          </p>

          <button
            className="btn btn-primary mt-2"
            onClick={onBack}
          >
            ← Back to Students
          </button>

        </div>
      </div>
    );
  }


  /* =========================================
     ATTENDANCE
  ========================================== */

  const attendance = Number(
    student.attendance || 0
  );

  const attendanceStatus =
    getAttendanceStatus(attendance);


  /* =========================================
     MARKS
  ========================================== */

  const marks = {
    python: Number(
      student.marks?.python || 0
    ),

    database: Number(
      student.marks?.database || 0
    ),

    webDevelopment: Number(
      student.marks?.webDevelopment || 0
    ),

    javascript: Number(
      student.marks?.javascript || 0
    ),
  };


  /* =========================================
     MARK CALCULATIONS
  ========================================== */

  const averageMarks =
    getAverageMarks(marks);

  const totalMarks =
    marks.python +
    marks.database +
    marks.webDevelopment +
    marks.javascript;

  const grade = getGrade(averageMarks);

  const performance =
    getPerformance(averageMarks);


  /* =========================================
     PERFORMANCE STATUS
  ========================================== */

  let performanceStatus;
  let performanceClass;

  if (
    averageMarks >= 75 &&
    attendance >= 75
  ) {
    performanceStatus = "Good Performance";
    performanceClass = "alert-success";
  } else if (
    averageMarks >= 50 &&
    attendance >= 60
  ) {
    performanceStatus = "Needs Improvement";
    performanceClass = "alert-warning";
  } else {
    performanceStatus = "At Risk";
    performanceClass = "alert-danger";
  }


  /* =========================================
     SUBJECT DATA
  ========================================== */

  const subjects = [
    {
      name: "Python",
      value: marks.python,
    },
    {
      name: "Database Management",
      value: marks.database,
    },
    {
      name: "Web Development",
      value: marks.webDevelopment,
    },
    {
      name: "JavaScript",
      value: marks.javascript,
    },
  ];


  /* =========================================
     RENDER
  ========================================== */

  return (
    <div className="card shadow-sm student-profile">

      <div className="card-body">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

          <div>

            <h3 className="mb-1">
              Student Profile
            </h3>

            <p className="text-muted mb-0">
              Complete student information
            </p>

          </div>


          <button
            className="btn btn-secondary"
            onClick={onBack}
          >
            ← Back
          </button>

        </div>


        {/* =====================================
            PROFILE HEADER
        ====================================== */}

        <div className="card border-primary mb-4">

          <div className="card-body">

            <div className="row align-items-center">

              {/* Avatar */}

              <div className="col-md-2 text-center mb-3 mb-md-0">

                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                  style={{
                    width: "90px",
                    height: "90px",
                    fontSize: "40px",
                  }}
                >
                  👤
                </div>

              </div>


              {/* Student Details */}

              <div className="col-md-7">

                <h4 className="mb-1">
                  {student.name}
                </h4>

                <p className="text-muted mb-1">
                  Student ID: {student.id}
                </p>

                <p className="text-muted mb-2">
                  {student.course || "Course not provided"}
                </p>

                <span className="badge bg-success">
                  Active
                </span>

              </div>


              {/* Grade */}

              <div className="col-md-3 text-md-end mt-3 mt-md-0">

                <small className="text-muted d-block">
                  Overall Grade
                </small>

                <h1
                  className={
                    grade === "F"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {grade}
                </h1>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            SUMMARY CARDS
        ====================================== */}

        <div className="row mb-4">

          {/* Attendance */}

          <div className="col-lg-4 col-md-6 mb-3">

            <div className="card border-primary h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Attendance
                </h6>

                <h2 className="text-primary">
                  {attendance}%
                </h2>

                <span
                  className={`badge ${attendanceStatus.className}`}
                >
                  {attendanceStatus.text}
                </span>

              </div>

            </div>

          </div>


          {/* Average Marks */}

          <div className="col-lg-4 col-md-6 mb-3">

            <div className="card border-success h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Average Marks
                </h6>

                <h2 className="text-success">
                  {averageMarks}%
                </h2>

                <small className="text-muted">
                  Academic Performance
                </small>

              </div>

            </div>

          </div>


          {/* Course */}

          <div className="col-lg-4 col-md-12 mb-3">

            <div className="card border-warning h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Course
                </h6>

                <h5 className="mt-2">
                  {student.course || "Not provided"}
                </h5>

                <small className="text-muted">
                  Current Course
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            PERSONAL INFORMATION
        ====================================== */}

        <h5 className="profile-section-title mb-3">
          👤 Personal Information
        </h5>

        <div className="row">

          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Student ID
                </small>

                <p className="fw-semibold mb-0">
                  {student.id}
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Full Name
                </small>

                <p className="fw-semibold mb-0">
                  {student.name}
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Gender
                </small>

                <p className="fw-semibold mb-0">
                  {student.gender || "Not provided"}
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Date of Birth
                </small>

                <p className="fw-semibold mb-0">
                  {student.dob || "Not provided"}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            CONTACT INFORMATION
        ====================================== */}

        <h5 className="profile-section-title mb-3 mt-3">
          📞 Contact Information
        </h5>

        <div className="row">

          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Email
                </small>

                <p className="fw-semibold mb-0">
                  {student.email || "Not provided"}
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Phone
                </small>

                <p className="fw-semibold mb-0">
                  {student.phone || "Not provided"}
                </p>

              </div>

            </div>

          </div>


          <div className="col-12 mb-3">

            <div className="card">

              <div className="card-body">

                <small className="text-muted">
                  Address
                </small>

                <p className="fw-semibold mb-0">
                  {student.address || "Not provided"}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            ACADEMIC INFORMATION
        ====================================== */}

        <h5 className="profile-section-title mb-3 mt-3">
          🎓 Academic Information
        </h5>

        <div className="row">

          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Course
                </small>

                <p className="fw-semibold mb-0">
                  {student.course || "Not provided"}
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-6 mb-3">

            <div className="card h-100">

              <div className="card-body">

                <small className="text-muted">
                  Department
                </small>

                <p className="fw-semibold mb-0">
                  {student.department || "Not provided"}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            ATTENDANCE OVERVIEW
        ====================================== */}

        <h5 className="profile-section-title mb-3 mt-3">
          📅 Attendance Overview
        </h5>

        <div className="card mb-4">

          <div className="card-body">

            <div className="d-flex justify-content-between">

              <span>
                Overall Attendance
              </span>

              <strong>
                {attendance}%
              </strong>

            </div>


            <div className="progress mt-2">

              <div
                className={`progress-bar ${
                  attendance >= 75
                    ? "bg-success"
                    : attendance >= 60
                    ? "bg-warning"
                    : "bg-danger"
                }`}
                style={{
                  width: `${Math.min(
                    Math.max(attendance, 0),
                    100
                  )}%`,
                }}
              >
                {attendance}%
              </div>

            </div>


            <div className="mt-2">

              <span
                className={`badge ${attendanceStatus.className}`}
              >
                {attendanceStatus.text}
              </span>

            </div>


            <small className="text-muted d-block mt-2">

              {attendance >= 75
                ? "Attendance requirement satisfied."
                : "Attendance is below the required 75%."}

            </small>

          </div>

        </div>


        {/* =====================================
            MARKS OVERVIEW
        ====================================== */}

        <h5 className="profile-section-title mb-3">
          📝 Marks Overview
        </h5>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-light">

              <tr>

                <th>
                  #
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Marks
                </th>

                <th>
                  Grade
                </th>

                <th>
                  Performance
                </th>

              </tr>

            </thead>


            <tbody>

              {subjects.map(
                (subject, index) => {

                  const subjectGrade =
                    getGrade(subject.value);

                  const subjectPerformance =
                    getPerformance(subject.value);

                  return (
                    <tr key={subject.name}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {subject.name}
                        </strong>
                      </td>

                      <td>
                        {subject.value} / 100
                      </td>

                      <td>

                        <span
                          className={`badge ${getGradeClass(
                            subject.value
                          )}`}
                        >
                          {subjectGrade}
                        </span>

                      </td>

                      <td>
                        {subjectPerformance}
                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>


        {/* =====================================
            MARKS SUMMARY
        ====================================== */}

        <div className="row mt-3 mb-4">

          <div className="col-md-4 mb-3">

            <div className="card border-info text-center">

              <div className="card-body">

                <small className="text-muted">
                  Total Marks
                </small>

                <h3 className="text-info">
                  {totalMarks} / 400
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4 mb-3">

            <div className="card border-success text-center">

              <div className="card-body">

                <small className="text-muted">
                  Average
                </small>

                <h3 className="text-success">
                  {averageMarks}%
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4 mb-3">

            <div className="card border-warning text-center">

              <div className="card-body">

                <small className="text-muted">
                  Overall Grade
                </small>

                <h3 className="text-warning">
                  {grade}
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            PERFORMANCE SUMMARY
        ====================================== */}

        <div
          className={`alert ${performanceClass} mt-4`}
        >

          <h5 className="mb-3">
            📊 Performance Summary
          </h5>


          <p className="mb-2">

            Average Marks:{" "}

            <strong>
              {averageMarks}%
            </strong>

          </p>


          <p className="mb-2">

            Attendance:{" "}

            <strong>
              {attendance}%
            </strong>

          </p>


          <p className="mb-2">

            Grade:{" "}

            <strong>
              {grade}
            </strong>

          </p>


          <p className="mb-0">

            Status:{" "}

            <strong>
              {performanceStatus}
            </strong>

          </p>

        </div>


        {/* =====================================
            ACTION BUTTONS
        ====================================== */}

        <div className="d-flex gap-2 mt-4 flex-wrap">

          <button
            className="btn btn-primary"
            onClick={onBack}
          >
            ← Back to Students
          </button>


          <button
            className="btn btn-outline-secondary"
            onClick={() => window.print()}
          >
            🖨 Print Profile
          </button>

        </div>

      </div>

    </div>
  );
}


export default StudentProfile;