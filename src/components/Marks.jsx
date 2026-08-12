import { useEffect, useState } from "react";

function Marks() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  const getMarks = (student) => {
    return {
      python: Number(student.marks?.python ?? 0),
      javascript: Number(student.marks?.javascript ?? 0),
      database: Number(student.marks?.database ?? 0),
      webDevelopment: Number(
        student.marks?.webDevelopment ?? 0
      ),
    };
  };

  const calculateTotal = (marks) => {
    return (
      marks.python +
      marks.javascript +
      marks.database +
      marks.webDevelopment
    );
  };

  const calculateAverage = (marks) => {
    const total = calculateTotal(marks);

    return Math.round(total / 4);
  };

  const getGrade = (average) => {
    if (average >= 90) return "A+";
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";

    return "F";
  };

  const getPerformance = (average) => {
    if (average >= 75) {
      return {
        text: "Excellent",
        className: "bg-success",
      };
    }

    if (average >= 60) {
      return {
        text: "Good",
        className: "bg-primary",
      };
    }

    if (average >= 50) {
      return {
        text: "Needs Improvement",
        className: "bg-warning text-dark",
      };
    }

    return {
      text: "Poor",
      className: "bg-danger",
    };
  };

  const updateMark = (
    studentId,
    subject,
    value
  ) => {
    let mark = Number(value);

    if (mark < 0) {
      mark = 0;
    }

    if (mark > 100) {
      mark = 100;
    }

    const updatedStudents = students.map(
      (student) => {
        if (student.id !== studentId) {
          return student;
        }

        const oldMarks = getMarks(student);

        const updatedMarks = {
          ...oldMarks,
          [subject]: mark,
        };

        return {
          ...student,
          marks: updatedMarks,
        };
      }
    );

    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.id
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const getGradeClass = (grade) => {
    if (grade === "A+" || grade === "A") {
      return "bg-success";
    }

    if (grade === "B") {
      return "bg-primary";
    }

    if (grade === "C") {
      return "bg-warning text-dark";
    }

    if (grade === "D") {
      return "bg-secondary";
    }

    return "bg-danger";
  };

  const averageMarks =
    students.length > 0
      ? Math.round(
          students.reduce((total, student) => {
            const marks = getMarks(student);

            return (
              total +
              calculateAverage(marks)
            );
          }, 0) / students.length
        )
      : 0;

  const passedStudents = students.filter(
    (student) =>
      calculateAverage(getMarks(student)) >= 50
  ).length;

  const failedStudents = students.filter(
    (student) =>
      calculateAverage(getMarks(student)) < 50
  ).length;

  return (
    <div className="card shadow-sm">

      <div className="card-body">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3>
              Marks Management
            </h3>

            <p className="text-muted mb-0">
              Manage student academic performance
            </p>

          </div>

          <div className="text-end">

            <small className="text-muted">
              Average Marks
            </small>

            <h4 className="text-primary mb-0">
              {averageMarks}/100
            </h4>

          </div>

        </div>


        {/* Statistics */}

        <div className="row mb-4">

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


          <div className="col-md-4 mb-3">

            <div className="card border-success h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Passed Students
                </h6>

                <h3 className="text-success">
                  {passedStudents}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4 mb-3">

            <div className="card border-danger h-100">

              <div className="card-body">

                <h6 className="text-muted">
                  Failed Students
                </h6>

                <h3 className="text-danger">
                  {failedStudents}
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


        {/* Marks Table */}

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>Student ID</th>

                <th>Student Name</th>

                <th>Python</th>

                <th>JavaScript</th>

                <th>Database</th>

                <th>Web Development</th>

                <th>Total</th>

                <th>Average</th>

                <th>Grade</th>

                <th>Performance</th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student) => {

                    const marks =
                      getMarks(student);

                    const total =
                      calculateTotal(marks);

                    const average =
                      calculateAverage(marks);

                    const grade =
                      getGrade(average);

                    const performance =
                      getPerformance(average);

                    return (
                      <tr key={student.id}>

                        <td>
                          {student.id}
                        </td>

                        <td>
                          <strong>
                            {student.name}
                          </strong>
                        </td>


                        {/* Python */}

                        <td>

                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="form-control"
                            style={{
                              width: "85px",
                            }}
                            value={marks.python}
                            onChange={(event) =>
                              updateMark(
                                student.id,
                                "python",
                                event.target.value
                              )
                            }
                          />

                        </td>


                        {/* JavaScript */}

                        <td>

                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="form-control"
                            style={{
                              width: "85px",
                            }}
                            value={
                              marks.javascript
                            }
                            onChange={(event) =>
                              updateMark(
                                student.id,
                                "javascript",
                                event.target.value
                              )
                            }
                          />

                        </td>


                        {/* Database */}

                        <td>

                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="form-control"
                            style={{
                              width: "85px",
                            }}
                            value={
                              marks.database
                            }
                            onChange={(event) =>
                              updateMark(
                                student.id,
                                "database",
                                event.target.value
                              )
                            }
                          />

                        </td>


                        {/* Web Development */}

                        <td>

                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="form-control"
                            style={{
                              width: "85px",
                            }}
                            value={
                              marks.webDevelopment
                            }
                            onChange={(event) =>
                              updateMark(
                                student.id,
                                "webDevelopment",
                                event.target.value
                              )
                            }
                          />

                        </td>


                        {/* Total */}

                        <td>

                          <strong>
                            {total}/400
                          </strong>

                        </td>


                        {/* Average */}

                        <td>

                          <strong>
                            {average}%
                          </strong>

                        </td>


                        {/* Grade */}

                        <td>

                          <span
                            className={`badge ${getGradeClass(
                              grade
                            )}`}
                          >
                            {grade}
                          </span>

                        </td>


                        {/* Performance */}

                        <td>

                          <span
                            className={`badge ${performance.className}`}
                          >
                            {performance.text}
                          </span>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="10"
                    className="text-center text-muted py-4"
                  >
                    No students found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Grade Information */}

        <div className="alert alert-info mt-4">

          <strong>
            Grade System:
          </strong>

          <span className="ms-2">
            A+ (90–100)
          </span>

          <span className="ms-3">
            A (80–89)
          </span>

          <span className="ms-3">
            B (70–79)
          </span>

          <span className="ms-3">
            C (60–69)
          </span>

          <span className="ms-3">
            D (50–59)
          </span>

          <span className="ms-3">
            F (Below 50)
          </span>

        </div>

      </div>

    </div>
  );
}

export default Marks;