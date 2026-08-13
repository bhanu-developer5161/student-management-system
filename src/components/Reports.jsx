import React, { useEffect, useState } from "react";

function Reports() {
  const [students, setStudents] = useState([]);

  /* =========================
     LOAD STUDENTS
  ========================== */

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    try {
      const data =
        JSON.parse(
          localStorage.getItem("students")
        ) || [];

      setStudents(data);
    } catch (error) {
      console.error(
        "Error loading students:",
        error
      );

      setStudents([]);
    }
  };


  /* =========================
     MARKS
  ========================== */

  const getMarks = (student) => {
    const python = Number(
      student.marks?.python || 0
    );

    const javascript = Number(
      student.marks?.javascript || 0
    );

    const database = Number(
      student.marks?.database || 0
    );

    const webDevelopment = Number(
      student.marks?.webDevelopment || 0
    );

    const total =
      python +
      javascript +
      database +
      webDevelopment;

    const average =
      Math.round(total / 4);

    return {
      total,
      average,
    };
  };


  /* =========================
     ATTENDANCE
  ========================== */

  const getAttendance = (student) => {
    return Number(
      student.attendance || 0
    );
  };


  /* =========================
     STATISTICS
  ========================== */

  const totalStudents =
    students.length;


  const totalAttendance =
    students.reduce(
      (sum, student) =>
        sum + getAttendance(student),
      0
    );


  const averageAttendance =
    totalStudents > 0
      ? Math.round(
          totalAttendance /
            totalStudents
        )
      : 0;


  const totalMarks =
    students.reduce(
      (sum, student) =>
        sum +
        getMarks(student).average,
      0
    );


  const averageMarks =
    totalStudents > 0
      ? Math.round(
          totalMarks /
            totalStudents
        )
      : 0;


  const passedStudents =
    students.filter(
      (student) =>
        getMarks(student).average >= 50
    ).length;


  const failedStudents =
    totalStudents -
    passedStudents;


  /* =========================
     ATTENDANCE CATEGORIES
  ========================== */

  const goodAttendance =
    students.filter(
      (student) =>
        getAttendance(student) >= 75
    ).length;


  const improvementAttendance =
    students.filter((student) => {

      const attendance =
        getAttendance(student);

      return (
        attendance >= 60 &&
        attendance < 75
      );
    }).length;


  const lowAttendance =
    students.filter(
      (student) =>
        getAttendance(student) < 60
    ).length;


  /* =========================
     TOP STUDENTS
  ========================== */

  const topStudents =
    [...students]
      .sort(
        (a, b) =>
          getMarks(b).average -
          getMarks(a).average
      )
      .slice(0, 5);


  /* =========================
     NEED IMPROVEMENT
  ========================== */

  const studentsNeedingImprovement =
    students
      .filter(
        (student) =>
          getMarks(student).average < 50 ||
          getAttendance(student) < 60
      )
      .slice(0, 5);


  /* =========================
     PRINT REPORT
  ========================== */

  const printReport = () => {
    window.print();
  };


  /* =========================
     DATE
  ========================== */

  const reportDate =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  return (
    <div className="reports-container">


      {/* =========================
          HEADER
      ========================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

            <div>

              <h2 className="mb-1">
                📊 Reports & Analytics
              </h2>

              <p className="text-muted mb-1">
                Monitor student academic
                performance and attendance.
              </p>

              <small className="text-muted">
                Report generated from
                current student records
              </small>

              <br />

              <small className="text-muted">
                📅 Generated on:{" "}
                {reportDate}
              </small>

            </div>


            <div className="d-flex gap-2">

              <button
                className="btn btn-primary"
                onClick={loadStudents}
              >
                🔄 Refresh Reports
              </button>


              <button
                className="btn btn-outline-dark"
                onClick={printReport}
              >
                🖨️ Print Report
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          REPORT STATUS
      ========================== */}

      <div className="alert alert-info shadow-sm">

        <strong>
          📅 Report Status:
        </strong>

        {" "}Showing analytics based on{" "}

        <strong>
          {totalStudents}
        </strong>

        {" "}registered student
        {totalStudents !== 1
          ? "s"
          : ""}.

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================== */}

      <div className="row">


        {/* TOTAL STUDENTS */}

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <p className="text-muted mb-1">
                    Total Students
                  </p>

                  <h2>
                    {totalStudents}
                  </h2>

                  <small className="text-muted">
                    Registered students
                  </small>

                </div>

                <div
                  style={{
                    fontSize: "35px",
                  }}
                >
                  👨‍🎓
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ATTENDANCE */}

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <p className="text-muted mb-1">
                    Average Attendance
                  </p>

                  <h2 className="text-primary">
                    {averageAttendance}%
                  </h2>

                  <small className="text-muted">
                    Overall attendance
                  </small>

                </div>

                <div
                  style={{
                    fontSize: "35px",
                  }}
                >
                  📋
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* MARKS */}

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <p className="text-muted mb-1">
                    Average Marks
                  </p>

                  <h2 className="text-warning">
                    {averageMarks}/100
                  </h2>

                  <small className="text-muted">
                    Overall performance
                  </small>

                </div>

                <div
                  style={{
                    fontSize: "35px",
                  }}
                >
                  📝
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* PASSED */}

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <p className="text-muted mb-1">
                    Passed Students
                  </p>

                  <h2 className="text-success">
                    {passedStudents}
                  </h2>

                  <small className="text-muted">
                    Marks 50% or above
                  </small>

                </div>

                <div
                  style={{
                    fontSize: "35px",
                  }}
                >
                  🏆
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          ATTENDANCE SUMMARY
      ========================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4>
            📋 Attendance Summary
          </h4>

          <p className="text-muted">
            Current student attendance
            distribution.
          </p>


          <div className="row mt-3">


            {/* GOOD */}

            <div className="col-md-4 mb-3">

              <div className="card border-success">

                <div className="card-body text-center">

                  <h6>
                    Good Attendance
                  </h6>

                  <h2 className="text-success">
                    {goodAttendance}
                  </h2>

                  <small>
                    75% and above
                  </small>

                </div>

              </div>

            </div>


            {/* IMPROVEMENT */}

            <div className="col-md-4 mb-3">

              <div className="card border-warning">

                <div className="card-body text-center">

                  <h6>
                    Need Improvement
                  </h6>

                  <h2 className="text-warning">
                    {improvementAttendance}
                  </h2>

                  <small>
                    60% - 74%
                  </small>

                </div>

              </div>

            </div>


            {/* LOW */}

            <div className="col-md-4 mb-3">

              <div className="card border-danger">

                <div className="card-body text-center">

                  <h6>
                    Low Attendance
                  </h6>

                  <h2 className="text-danger">
                    {lowAttendance}
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


      {/* =========================
          ACADEMIC SUMMARY
      ========================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4>
            📝 Academic Summary
          </h4>

          <p className="text-muted">
            Overall academic performance.
          </p>


          <div className="row mt-3">


            {/* AVERAGE */}

            <div className="col-md-4 mb-3">

              <div className="card border-primary">

                <div className="card-body text-center">

                  <h6>
                    Average Marks
                  </h6>

                  <h2 className="text-primary">
                    {averageMarks}%
                  </h2>

                </div>

              </div>

            </div>


            {/* PASSED */}

            <div className="col-md-4 mb-3">

              <div className="card border-success">

                <div className="card-body text-center">

                  <h6>
                    Passed
                  </h6>

                  <h2 className="text-success">
                    {passedStudents}
                  </h2>

                </div>

              </div>

            </div>


            {/* FAILED */}

            <div className="col-md-4 mb-3">

              <div className="card border-danger">

                <div className="card-body text-center">

                  <h6>
                    Failed
                  </h6>

                  <h2 className="text-danger">
                    {failedStudents}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          TOP PERFORMERS
      ========================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4>
            🏆 Top Performing Students
          </h4>

          <p className="text-muted">
            Students with the highest
            academic performance.
          </p>


          {topStudents.length === 0 ? (

            <div className="alert alert-info">
              No student records available.
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover">

                <thead>

                  <tr>

                    <th>
                      Rank
                    </th>

                    <th>
                      Student ID
                    </th>

                    <th>
                      Student Name
                    </th>

                    <th>
                      Marks
                    </th>

                    <th>
                      Attendance
                    </th>

                    <th>
                      Performance
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {topStudents.map(
                    (student, index) => {

                      const marks =
                        getMarks(student);

                      const attendance =
                        getAttendance(student);


                      return (

                        <tr
                          key={
                            student.id ||
                            index
                          }
                        >

                          <td>

                            {index === 0
                              ? "🥇"
                              : index === 1
                              ? "🥈"
                              : index === 2
                              ? "🥉"
                              : index + 1}

                          </td>


                          <td>
                            {student.id}
                          </td>


                          <td>

                            <strong>
                              {student.name}
                            </strong>

                          </td>


                          <td>
                            {marks.average}%
                          </td>


                          <td>
                            {attendance}%
                          </td>


                          <td>

                            {marks.average >= 80 ? (

                              <span className="badge bg-success">
                                Excellent
                              </span>

                            ) : marks.average >= 60 ? (

                              <span className="badge bg-primary">
                                Good
                              </span>

                            ) : (

                              <span className="badge bg-warning text-dark">
                                Average
                              </span>

                            )}

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          NEED IMPROVEMENT
      ========================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4>
            ⚠️ Students Needing Improvement
          </h4>

          <p className="text-muted">
            Students requiring additional
            academic or attendance support.
          </p>


          {studentsNeedingImprovement.length === 0 ? (

            <div className="alert alert-success">
              🎉 Great! No students currently
              need improvement.
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover">

                <thead>

                  <tr>

                    <th>
                      Student ID
                    </th>

                    <th>
                      Student Name
                    </th>

                    <th>
                      Marks
                    </th>

                    <th>
                      Attendance
                    </th>

                    <th>
                      Reason
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {studentsNeedingImprovement.map(
                    (student) => {

                      const marks =
                        getMarks(student);

                      const attendance =
                        getAttendance(student);


                      let reason;


                      if (
                        marks.average < 50 &&
                        attendance < 60
                      ) {

                        reason =
                          "Low marks & attendance";

                      } else if (
                        marks.average < 50
                      ) {

                        reason =
                          "Low marks";

                      } else {

                        reason =
                          "Low attendance";

                      }


                      return (

                        <tr
                          key={student.id}
                        >

                          <td>
                            {student.id}
                          </td>


                          <td>

                            <strong>
                              {student.name}
                            </strong>

                          </td>


                          <td>
                            {marks.average}%
                          </td>


                          <td>
                            {attendance}%
                          </td>


                          <td>

                            <span className="badge bg-danger">
                              {reason}
                            </span>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          REPORT RULES
      ========================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h5>
            📌 Report Rules
          </h5>


          <ul className="mb-0">

            <li>
              Attendance of 75% or above
              is considered good.
            </li>

            <li>
              Attendance between 60% and
              74% needs improvement.
            </li>

            <li>
              Attendance below 60% is
              considered low.
            </li>

            <li>
              Marks of 50% or above are
              considered passing.
            </li>

            <li>
              Reports are calculated from
              current student records.
            </li>

          </ul>

        </div>

      </div>


      {/* =========================
          REPORT FOOTER
      ========================== */}

      <div className="text-center text-muted mb-4">

        <small>
          🎓 Student Management System
          {" • "}
          Reports & Analytics
        </small>

      </div>


    </div>
  );
}

export default Reports;