import { useState, useEffect } from "react";

function Attendance() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [];
  });

  const [search, setSearch] = useState("");

  const [workingDays, setWorkingDays] = useState(() => {
    const savedDays = localStorage.getItem("workingDays");

    return savedDays ? Number(savedDays) : 100;
  });

  // Save students
  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  // Save working days
  useEffect(() => {
    localStorage.setItem(
      "workingDays",
      workingDays
    );
  }, [workingDays]);

  // Calculate attendance percentage
  const calculateAttendance = (
    presentDays,
    totalDays
  ) => {
    if (totalDays <= 0) {
      return 0;
    }

    return Math.round(
      (Number(presentDays) /
        Number(totalDays)) *
        100
    );
  };

  // Update present days
  const updatePresentDays = (
    studentId,
    value
  ) => {
    let presentDays = Number(value);

    if (presentDays < 0) {
      presentDays = 0;
    }

    if (presentDays > workingDays) {
      presentDays = workingDays;
    }

    const attendance =
      calculateAttendance(
        presentDays,
        workingDays
      );

    const updatedStudents = students.map(
      (student) =>
        student.id === studentId
          ? {
              ...student,
              attendance,
              presentDays,
              totalWorkingDays: workingDays,
            }
          : student
    );

    setStudents(updatedStudents);
  };

  // Search students
  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.id
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Get attendance status
  const getStatus = (attendance) => {
    if (attendance >= 75) {
      return {
        text: "Good",
        className: "bg-success",
      };
    }

    if (attendance >= 60) {
      return {
        text: "Warning",
        className: "bg-warning text-dark",
      };
    }

    return {
      text: "Low",
      className: "bg-danger",
    };
  };

  // Get present days
  const getPresentDays = (student) => {
    if (
      student.presentDays !== undefined
    ) {
      return Number(student.presentDays);
    }

    return Math.round(
      (Number(student.attendance || 0) /
        100) *
        workingDays
    );
  };

  // Get absent days
  const getAbsentDays = (student) => {
    const presentDays =
      getPresentDays(student);

    return Math.max(
      workingDays - presentDays,
      0
    );
  };

  // Average attendance
  const averageAttendance =
    students.length > 0
      ? Math.round(
          students.reduce(
            (total, student) =>
              total +
              Number(
                student.attendance || 0
              ),
            0
          ) / students.length
        )
      : 0;

  // Good attendance count
  const goodAttendance =
    students.filter(
      (student) =>
        Number(
          student.attendance || 0
        ) >= 75
    ).length;

  // Low attendance count
  const lowAttendance =
    students.filter(
      (student) =>
        Number(
          student.attendance || 0
        ) < 75
    ).length;

  return (
    <div className="card shadow-sm">

      <div className="card-body">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3>
              Attendance Management
            </h3>

            <p className="text-muted mb-0">
              Track and manage student attendance
            </p>

          </div>

          <div className="text-end">

            <small className="text-muted">
              Average Attendance
            </small>

            <h4 className="text-primary mb-0">
              {averageAttendance}%
            </h4>

          </div>

        </div>


        {/* Working Days */}

        <div className="card bg-light mb-4">

          <div className="card-body">

            <div className="row align-items-center">

              <div className="col-md-6">

                <label className="form-label">
                  Total Working Days
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={workingDays}
                  min="1"
                  onChange={(event) => {
                    const value =
                      Number(
                        event.target.value
                      );

                    setWorkingDays(
                      value > 0 ? value : 1
                    );
                  }}
                />

              </div>

              <div className="col-md-6">

                <div className="alert alert-info mb-0 mt-3 mt-md-0">

                  <strong>
                    Attendance Calculation:
                  </strong>

                  <br />

                  Present Days ÷ Working Days × 100

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Statistics */}

        <div className="row mb-4">

          {/* Total Students */}

          <div className="col-md-4 mb-3">

            <div className="card border-primary h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Total Students
                </h6>

                <h3 className="text-primary">
                  {students.length}
                </h3>

              </div>

            </div>

          </div>


          {/* Good Attendance */}

          <div className="col-md-4 mb-3">

            <div className="card border-success h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Good Attendance
                </h6>

                <h3 className="text-success">
                  {goodAttendance}
                </h3>

              </div>

            </div>

          </div>


          {/* Low Attendance */}

          <div className="col-md-4 mb-3">

            <div className="card border-danger h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Low Attendance
                </h6>

                <h3 className="text-danger">
                  {lowAttendance}
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* Search */}

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search student by ID or name..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        {/* Attendance Table */}

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>
                  Student ID
                </th>

                <th>
                  Student Name
                </th>

                <th>
                  Working Days
                </th>

                <th>
                  Present Days
                </th>

                <th>
                  Absent Days
                </th>

                <th>
                  Attendance
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student) => {

                    const attendance =
                      Number(
                        student.attendance || 0
                      );

                    const presentDays =
                      getPresentDays(student);

                    const absentDays =
                      getAbsentDays(student);

                    const status =
                      getStatus(
                        attendance
                      );

                    return (
                      <tr key={student.id}>

                        {/* ID */}

                        <td>
                          {student.id}
                        </td>


                        {/* Name */}

                        <td>

                          <strong>
                            {student.name}
                          </strong>

                        </td>


                        {/* Working Days */}

                        <td>
                          {workingDays}
                        </td>


                        {/* Present Days */}

                        <td>

                          <input
                            type="number"
                            className="form-control"
                            value={presentDays}
                            min="0"
                            max={workingDays}
                            style={{
                              width: "100px",
                            }}
                            onChange={(event) =>
                              updatePresentDays(
                                student.id,
                                event.target.value
                              )
                            }
                          />

                        </td>


                        {/* Absent Days */}

                        <td>

                          <span className="text-danger fw-bold">
                            {absentDays}
                          </span>

                        </td>


                        {/* Attendance */}

                        <td>

                          <div
                            style={{
                              minWidth: "150px",
                            }}
                          >

                            <div className="d-flex justify-content-between mb-1">

                              <small>
                                Attendance
                              </small>

                              <strong>
                                {attendance}%
                              </strong>

                            </div>


                            <div className="progress">

                              <div
                                className={`progress-bar ${
                                  attendance >=
                                  75
                                    ? "bg-success"
                                    : attendance >=
                                      60
                                    ? "bg-warning"
                                    : "bg-danger"
                                }`}
                                style={{
                                  width: `${attendance}%`,
                                }}
                              >
                                {attendance}%
                              </div>

                            </div>

                          </div>

                        </td>


                        {/* Status */}

                        <td>

                          <span
                            className={`badge ${status.className}`}
                          >
                            {status.text}
                          </span>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center text-muted py-4"
                  >
                    No students found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Attendance Rule */}

        <div className="alert alert-info mt-4">

          <strong>
            Attendance Rule:
          </strong>

          {" "}
          Students with attendance of
          <strong> 75% or above </strong>
          have good attendance.

          Students between
          <strong> 60% and 74% </strong>
          need improvement.

          Students below
          <strong> 60% </strong>
          have low attendance.

        </div>

      </div>

    </div>
  );
}

export default Attendance;