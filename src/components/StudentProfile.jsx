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


function StudentProfile({ student, onBack }) {

  // Student not found
  if (!student) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center">

          <h4>Student Not Found</h4>

          <button
            className="btn btn-primary mt-3"
            onClick={onBack}
          >
            Back to Students
          </button>

        </div>
      </div>
    );
  }


  // Attendance
  const attendance = Number(
    student.attendance || 0
  );


  // Marks
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


  // Average marks
  const averageMarks = getAverageMarks(marks);


  // Performance status
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


  return (
    <div className="card shadow-sm student-profile">

      <div className="card-body">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3>
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


        {/* Profile Header */}

        <div className="profile-header mb-4">

          <div className="profile-avatar">
            👤
          </div>


          <div>

            <h4>
              {student.name}
            </h4>

            <p className="text-muted mb-1">
              Student ID: {student.id}
            </p>

            <span className="badge bg-success">
              Active
            </span>

          </div>

        </div>


        {/* Summary Cards */}

        <div className="row mb-4">

          {/* Attendance Card */}

          <div className="col-md-4 mb-3">

            <div className="card border-primary h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Attendance
                </h6>

                <h3 className="text-primary">
                  {attendance}%
                </h3>

                <p className="mb-0">
                  Overall Attendance
                </p>

              </div>

            </div>

          </div>


          {/* Average Marks Card */}

          <div className="col-md-4 mb-3">

            <div className="card border-success h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Average Marks
                </h6>

                <h3 className="text-success">
                  {averageMarks}%
                </h3>

                <p className="mb-0">
                  Academic Performance
                </p>

              </div>

            </div>

          </div>


          {/* Course Card */}

          <div className="col-md-4 mb-3">

            <div className="card border-warning h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Course
                </h6>

                <h5 className="mt-2">
                  {student.course}
                </h5>

                <p className="mb-0">
                  Current Course
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Personal Information */}

        <h5 className="profile-section-title">
          Personal Information
        </h5>


        <div className="row">

          <div className="col-md-6 mb-3">

            <strong>
              Student ID
            </strong>

            <p>
              {student.id}
            </p>

          </div>


          <div className="col-md-6 mb-3">

            <strong>
              Full Name
            </strong>

            <p>
              {student.name}
            </p>

          </div>


          <div className="col-md-6 mb-3">

            <strong>
              Gender
            </strong>

            <p>
              {student.gender || "Not provided"}
            </p>

          </div>


          <div className="col-md-6 mb-3">

            <strong>
              Date of Birth
            </strong>

            <p>
              {student.dob || "Not provided"}
            </p>

          </div>

        </div>


        {/* Contact Information */}

        <h5 className="profile-section-title">
          Contact Information
        </h5>


        <div className="row">

          <div className="col-md-6 mb-3">

            <strong>
              Email
            </strong>

            <p>
              {student.email}
            </p>

          </div>


          <div className="col-md-6 mb-3">

            <strong>
              Phone
            </strong>

            <p>
              {student.phone}
            </p>

          </div>


          <div className="col-12 mb-3">

            <strong>
              Address
            </strong>

            <p>
              {student.address ||
                "Not provided"}
            </p>

          </div>

        </div>


        {/* Academic Information */}

        <h5 className="profile-section-title">
          Academic Information
        </h5>


        <div className="row">

          <div className="col-md-6 mb-3">

            <strong>
              Course
            </strong>

            <p>
              {student.course}
            </p>

          </div>


          <div className="col-md-6 mb-3">

            <strong>
              Department
            </strong>

            <p>
              {student.department}
            </p>

          </div>

        </div>


        {/* Attendance Overview */}

        <h5 className="profile-section-title">
          Attendance Overview
        </h5>


        <div className="mb-3">

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
                  : "bg-danger"
              }`}
              style={{
                width: `${attendance}%`,
              }}
            >
              {attendance}%
            </div>

          </div>


          <small className="text-muted">

            {attendance >= 75
              ? "Attendance requirement satisfied"
              : "Attendance below 75%"}

          </small>

        </div>


        {/* Marks Overview */}

        <h5 className="profile-section-title">
          Marks Overview
        </h5>


        <div className="table-responsive">

          <table className="table table-bordered">

            <thead className="table-light">

              <tr>

                <th>
                  Subject
                </th>

                <th>
                  Marks
                </th>

                <th>
                  Grade
                </th>

              </tr>

            </thead>


            <tbody>

              {/* Python */}

              <tr>

                <td>
                  Python
                </td>

                <td>
                  {marks.python} / 100
                </td>

                <td>

                  <span
                    className={`badge ${getGradeClass(
                      marks.python
                    )}`}
                  >
                    {getGrade(marks.python)}
                  </span>

                </td>

              </tr>


              {/* Database */}

              <tr>

                <td>
                  Database Management
                </td>

                <td>
                  {marks.database} / 100
                </td>

                <td>

                  <span
                    className={`badge ${getGradeClass(
                      marks.database
                    )}`}
                  >
                    {getGrade(marks.database)}
                  </span>

                </td>

              </tr>


              {/* Web Development */}

              <tr>

                <td>
                  Web Development
                </td>

                <td>
                  {marks.webDevelopment} / 100
                </td>

                <td>

                  <span
                    className={`badge ${getGradeClass(
                      marks.webDevelopment
                    )}`}
                  >
                    {getGrade(
                      marks.webDevelopment
                    )}
                  </span>

                </td>

              </tr>


              {/* JavaScript */}

              <tr>

                <td>
                  JavaScript
                </td>

                <td>
                  {marks.javascript} / 100
                </td>

                <td>

                  <span
                    className={`badge ${getGradeClass(
                      marks.javascript
                    )}`}
                  >
                    {getGrade(
                      marks.javascript
                    )}
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>


        {/* Performance Summary */}

        <div
          className={`alert ${performanceClass} mt-4`}
        >

          <h6 className="mb-2">
            Performance Summary
          </h6>


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


          <p className="mb-0">

            Status:{" "}

            <strong>
              {performanceStatus}
            </strong>

          </p>

        </div>


        {/* Action Buttons */}

        <div className="d-flex gap-2 mt-4">

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