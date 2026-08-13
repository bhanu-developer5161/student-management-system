import React, { useEffect, useMemo, useState } from "react";

function Students() {
  /* =========================================
     STUDENT DATA
  ========================================== */

  const [students, setStudents] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    course: "",

    // Day 10: Attendance + Marks
    attendance: "",
    python: "",
    javascript: "",
    database: "",
    webDevelopment: "",
  });

  /* =========================================
     SEARCH & FILTERS
  ========================================== */

  const [searchTerm, setSearchTerm] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");

  const [courseFilter, setCourseFilter] = useState("");

  /* =========================================
     LOAD STUDENTS
  ========================================== */

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    try {
      const data =
        JSON.parse(localStorage.getItem("students")) || [];

      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
      setStudents([]);
    }
  };

  /* =========================================
     SAVE STUDENTS
  ========================================== */

  const saveStudents = (data) => {
    setStudents(data);

    localStorage.setItem(
      "students",
      JSON.stringify(data)
    );
  };

  /* =========================================
     FORM INPUT
  ========================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================
     GENERATE UNIQUE STUDENT ID
  ========================================== */

  const generateStudentId = () => {
    let id;

    do {
      id = `ST${Math.floor(1000 + Math.random() * 9000)}`;
    } while (
      students.some((student) => student.id === id)
    );

    return id;
  };

  /* =========================================
     ADD / UPDATE STUDENT
  ========================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();

    const email = formData.email.trim();

    const phone = formData.phone.trim();

    const attendance = Number(
      formData.attendance || 0
    );

    const python = Number(
      formData.python || 0
    );

    const javascript = Number(
      formData.javascript || 0
    );

    const database = Number(
      formData.database || 0
    );

    const webDevelopment = Number(
      formData.webDevelopment || 0
    );

    /* =====================================
       BASIC VALIDATION
    ====================================== */

    if (!name) {
      alert("Please enter student name.");
      return;
    }

    if (!email) {
      alert("Please enter student email.");
      return;
    }

    if (!formData.department) {
      alert("Please select department.");
      return;
    }

    if (!formData.course) {
      alert("Please select course.");
      return;
    }

    /* =====================================
       MARKS VALIDATION
    ====================================== */

    if (
      attendance < 0 ||
      attendance > 100
    ) {
      alert("Attendance must be between 0 and 100.");
      return;
    }

    if (
      python < 0 ||
      python > 100 ||
      javascript < 0 ||
      javascript > 100 ||
      database < 0 ||
      database > 100 ||
      webDevelopment < 0 ||
      webDevelopment > 100
    ) {
      alert("Each subject mark must be between 0 and 100.");
      return;
    }

    /* =====================================
       DUPLICATE EMAIL CHECK
    ====================================== */

    const duplicateEmail = students.some(
      (student) =>
        student.email?.toLowerCase() ===
          email.toLowerCase() &&
        student.id !== editingId
    );

    if (duplicateEmail) {
      alert(
        "A student with this email already exists."
      );
      return;
    }

    /* =====================================
       UPDATE STUDENT
    ====================================== */

    if (editingId !== null) {
      const updatedStudents = students.map(
        (student) => {
          if (student.id === editingId) {
            return {
              ...student,

              name,
              email,
              phone,

              department:
                formData.department,

              course:
                formData.course,

              attendance,

              marks: {
                python,
                javascript,
                database,
                webDevelopment,
              },
            };
          }

          return student;
        }
      );

      saveStudents(updatedStudents);

      alert("Student updated successfully!");

      resetForm();

      return;
    }

    /* =====================================
       ADD NEW STUDENT
    ====================================== */

    const newStudent = {
      id: generateStudentId(),

      name,

      email,

      phone,

      department:
        formData.department,

      course:
        formData.course,

      attendance,

      marks: {
        python,
        javascript,
        database,
        webDevelopment,
      },
    };

    const updatedStudents = [
      ...students,
      newStudent,
    ];

    saveStudents(updatedStudents);

    alert("Student added successfully!");

    resetForm();
  };

  /* =========================================
     RESET FORM
  ========================================== */

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      course: "",

      attendance: "",
      python: "",
      javascript: "",
      database: "",
      webDevelopment: "",
    });

    setEditingId(null);

    setShowForm(false);
  };

  /* =========================================
     EDIT STUDENT
  ========================================== */

  const handleEdit = (student) => {
    setFormData({
      name: student.name || "",

      email: student.email || "",

      phone: student.phone || "",

      department:
        student.department || "",

      course:
        student.course || "",

      // Day 10: Load existing values
      attendance:
        student.attendance ?? "",

      python:
        student.marks?.python ?? "",

      javascript:
        student.marks?.javascript ?? "",

      database:
        student.marks?.database ?? "",

      webDevelopment:
        student.marks?.webDevelopment ?? "",
    });

    setEditingId(student.id);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     DELETE STUDENT
  ========================================== */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedStudents =
      students.filter(
        (student) => student.id !== id
      );

    saveStudents(updatedStudents);

    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }

    alert("Student deleted successfully!");
  };

  /* =========================================
     VIEW STUDENT
  ========================================== */

  const handleView = (student) => {
    setSelectedStudent(student);
  };

  /* =========================================
     GET MARKS
  ========================================== */

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

    const average = Math.round(
      total / 4
    );

    return {
      python,
      javascript,
      database,
      webDevelopment,
      total,
      average,
    };
  };

  /* =========================================
     GET GRADE
  ========================================== */

  const getGrade = (average) => {
    if (average >= 90) return "A+";

    if (average >= 80) return "A";

    if (average >= 70) return "B";

    if (average >= 60) return "C";

    if (average >= 50) return "D";

    return "F";
  };

  /* =========================================
     GET PERFORMANCE
  ========================================== */

  const getPerformance = (average) => {
    if (average >= 80) {
      return "Excellent";
    }

    if (average >= 60) {
      return "Good";
    }

    if (average >= 50) {
      return "Average";
    }

    return "Poor";
  };

  /* =========================================
     GET ATTENDANCE STATUS
  ========================================== */

  const getAttendanceStatus = (
    attendance
  ) => {
    if (attendance >= 75) {
      return {
        text: "Good",
        className: "bg-success",
      };
    }

    if (attendance >= 60) {
      return {
        text: "Need Improvement",
        className: "bg-warning text-dark",
      };
    }

    return {
      text: "Low",
      className: "bg-danger",
    };
  };

  /* =========================================
     SEARCH + FILTER
  ========================================== */

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      const studentName = String(
        student.name || ""
      ).toLowerCase();

      const studentId = String(
        student.id || ""
      ).toLowerCase();

      const studentEmail = String(
        student.email || ""
      ).toLowerCase();

      const matchesSearch =
        search === "" ||
        studentName.includes(search) ||
        studentId.includes(search) ||
        studentEmail.includes(search);

      const matchesDepartment =
        departmentFilter === "" ||
        student.department ===
          departmentFilter;

      const matchesCourse =
        courseFilter === "" ||
        student.course === courseFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesCourse
      );
    });
  }, [
    students,
    searchTerm,
    departmentFilter,
    courseFilter,
  ]);

  /* =========================================
     UNIQUE DEPARTMENTS
  ========================================== */

  const departments = useMemo(() => {
    return [
      ...new Set(
        students
          .map(
            (student) =>
              student.department
          )
          .filter(Boolean)
      ),
    ];
  }, [students]);

  /* =========================================
     UNIQUE COURSES
  ========================================== */

  const courses = useMemo(() => {
    return [
      ...new Set(
        students
          .map(
            (student) =>
              student.course
          )
          .filter(Boolean)
      ),
    ];
  }, [students]);

  /* =========================================
     CLEAR FILTERS
  ========================================== */

  const clearFilters = () => {
    setSearchTerm("");

    setDepartmentFilter("");

    setCourseFilter("");
  };

  /* =========================================
     SUMMARY DATA
  ========================================== */

  const totalStudents =
    students.length;

  const averageAttendance =
    totalStudents > 0
      ? Math.round(
          students.reduce(
            (sum, student) =>
              sum +
              Number(
                student.attendance || 0
              ),
            0
          ) / totalStudents
        )
      : 0;

  const averageMarks =
    totalStudents > 0
      ? Math.round(
          students.reduce(
            (sum, student) =>
              sum +
              getMarks(student).average,
            0
          ) / totalStudents
        )
      : 0;

  /* =========================================
     RENDER
  ========================================== */

  return (
    <div className="students-container">

      {/* HEADER */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

            <div>
              <h2 className="mb-1">
                👨‍🎓 Student Management
              </h2>

              <p className="text-muted mb-0">
                Manage student records,
                profiles and academic details.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  setShowForm(true);
                }
              }}
            >
              {showForm
                ? "✕ Close Form"
                : "➕ Add Student"}
            </button>

          </div>

        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="row mb-4">

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm border-primary h-100">
            <div className="card-body">

              <p className="text-muted mb-1">
                Total Students
              </p>

              <h2 className="text-primary">
                {totalStudents}
              </h2>

              <small className="text-muted">
                Registered students
              </small>

            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm border-success h-100">
            <div className="card-body">

              <p className="text-muted mb-1">
                Showing
              </p>

              <h2 className="text-success">
                {filteredStudents.length}
              </h2>

              <small className="text-muted">
                Filtered students
              </small>

            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm border-info h-100">
            <div className="card-body">

              <p className="text-muted mb-1">
                Average Attendance
              </p>

              <h2 className="text-info">
                {averageAttendance}%
              </h2>

              <small className="text-muted">
                Overall attendance
              </small>

            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm border-warning h-100">
            <div className="card-body">

              <p className="text-muted mb-1">
                Average Marks
              </p>

              <h2 className="text-warning">
                {averageMarks}%
              </h2>

              <small className="text-muted">
                Academic average
              </small>

            </div>
          </div>
        </div>

      </div>

      {/* =====================================
          ADD / EDIT FORM
      ====================================== */}

      {showForm && (
        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <h4 className="mb-4">
              {editingId !== null
                ? "✏️ Edit Student"
                : "➕ Add New Student"}
            </h4>

            <form onSubmit={handleSubmit}>

              <div className="row g-3">

                {/* NAME */}

                <div className="col-md-6">

                  <label className="form-label">
                    Student Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter student name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* EMAIL */}

                <div className="col-md-6">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* PHONE */}

                <div className="col-md-4">

                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

                {/* DEPARTMENT */}

                <div className="col-md-4">

                  <label className="form-label">
                    Department
                  </label>

                  <select
                    name="department"
                    className="form-select"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Department
                    </option>

                    <option value="Computer Science">
                      Computer Science
                    </option>

                    <option value="Information Technology">
                      Information Technology
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Mechanical">
                      Mechanical
                    </option>

                    <option value="Civil">
                      Civil
                    </option>

                  </select>

                </div>

                {/* COURSE */}

                <div className="col-md-4">

                  <label className="form-label">
                    Course
                  </label>

                  <select
                    name="course"
                    className="form-select"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Course
                    </option>

                    <option value="B.Sc Computer Science">
                      B.Sc Computer Science
                    </option>

                    <option value="BCA">
                      BCA
                    </option>

                    <option value="B.Tech">
                      B.Tech
                    </option>

                    <option value="MCA">
                      MCA
                    </option>

                    <option value="MBA">
                      MBA
                    </option>

                  </select>

                </div>

                {/* =================================
                    DAY 10 - ATTENDANCE
                ================================== */}

                <div className="col-md-4">

                  <label className="form-label">
                    📅 Attendance (%)
                  </label>

                  <input
                    type="number"
                    name="attendance"
                    className="form-control"
                    placeholder="Enter attendance"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={handleChange}
                  />

                  <small className="text-muted">
                    Enter value between 0 and 100
                  </small>

                </div>

                {/* =================================
                    DAY 10 - PYTHON
                ================================== */}

                <div className="col-md-4">

                  <label className="form-label">
                    🐍 Python Marks
                  </label>

                  <input
                    type="number"
                    name="python"
                    className="form-control"
                    placeholder="Enter Python marks"
                    min="0"
                    max="100"
                    value={formData.python}
                    onChange={handleChange}
                  />

                </div>

                {/* =================================
                    DAY 10 - JAVASCRIPT
                ================================== */}

                <div className="col-md-4">

                  <label className="form-label">
                    ⚡ JavaScript Marks
                  </label>

                  <input
                    type="number"
                    name="javascript"
                    className="form-control"
                    placeholder="Enter JavaScript marks"
                    min="0"
                    max="100"
                    value={formData.javascript}
                    onChange={handleChange}
                  />

                </div>

                {/* =================================
                    DAY 10 - DATABASE
                ================================== */}

                <div className="col-md-4">

                  <label className="form-label">
                    🗄️ Database Marks
                  </label>

                  <input
                    type="number"
                    name="database"
                    className="form-control"
                    placeholder="Enter Database marks"
                    min="0"
                    max="100"
                    value={formData.database}
                    onChange={handleChange}
                  />

                </div>

                {/* =================================
                    DAY 10 - WEB DEVELOPMENT
                ================================== */}

                <div className="col-md-4">

                  <label className="form-label">
                    🌐 Web Development Marks
                  </label>

                  <input
                    type="number"
                    name="webDevelopment"
                    className="form-control"
                    placeholder="Enter Web Development marks"
                    min="0"
                    max="100"
                    value={formData.webDevelopment}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* BUTTONS */}

              <div className="mt-4 d-flex gap-2">

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  {editingId !== null
                    ? "💾 Update Student"
                    : "➕ Add Student"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* SEARCH & FILTERS */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-5">

              <label className="form-label">
                🔍 Search Student
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by name, ID or email..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

            </div>

            <div className="col-md-3">

              <label className="form-label">
                🏢 Department
              </label>

              <select
                className="form-select"
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Departments
                </option>

                {departments.map(
                  (department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  )
                )}

              </select>

            </div>

            <div className="col-md-3">

              <label className="form-label">
                📚 Course
              </label>

              <select
                className="form-select"
                value={courseFilter}
                onChange={(e) =>
                  setCourseFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Courses
                </option>

                {courses.map(
                  (course) => (
                    <option
                      key={course}
                      value={course}
                    >
                      {course}
                    </option>
                  )
                )}

              </select>

            </div>

            <div className="col-12">

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={clearFilters}
              >
                ✕ Clear Filters
              </button>

            </div>

          </div>

          <div className="mt-3">

            <small className="text-muted">

              Showing{" "}
              <strong>
                {filteredStudents.length}
              </strong>

              {" "}of{" "}

              <strong>
                {students.length}
              </strong>

              {" "}students

            </small>

          </div>

        </div>
      </div>

      {/* STUDENT TABLE */}

      <div className="card shadow-sm">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div>

              <h4 className="mb-1">
                📋 Student Records
              </h4>

              <p className="text-muted mb-0">
                Manage all registered students.
              </p>

            </div>

            <span className="badge bg-primary fs-6">
              {filteredStudents.length}
            </span>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>#</th>

                  <th>Student ID</th>

                  <th>Student Name</th>

                  <th>Email</th>

                  <th>Department</th>

                  <th>Course</th>

                  <th>Attendance</th>

                  <th>Marks</th>

                  <th>Grade</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.length === 0 ? (

                  <tr>

                    <td
                      colSpan="10"
                      className="text-center py-5"
                    >

                      <div
                        style={{
                          fontSize: "45px",
                        }}
                      >
                        🔍
                      </div>

                      <h5 className="mt-3">
                        No Students Found
                      </h5>

                      <p className="text-muted">
                        Try changing your
                        search or filters.
                      </p>

                      <button
                        className="btn btn-outline-primary"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>

                    </td>

                  </tr>

                ) : (

                  filteredStudents.map(
                    (student, index) => {

                      const marks =
                        getMarks(student);

                      const attendance =
                        Number(
                          student.attendance || 0
                        );

                      const grade =
                        getGrade(
                          marks.average
                        );

                      const attendanceStatus =
                        getAttendanceStatus(
                          attendance
                        );

                      return (

                        <tr
                          key={
                            student.id ||
                            index
                          }
                        >

                          <td>
                            {index + 1}
                          </td>

                          <td>

                            <span className="badge bg-secondary">
                              {student.id}
                            </span>

                          </td>

                          <td>

                            <strong>
                              {student.name}
                            </strong>

                          </td>

                          <td>
                            {student.email || "-"}
                          </td>

                          <td>
                            {student.department || "-"}
                          </td>

                          <td>
                            {student.course || "-"}
                          </td>

                          <td>

                            <span
                              className={`badge ${attendanceStatus.className}`}
                            >
                              {attendance}%
                            </span>

                          </td>

                          <td>

                            <span
                              className={`badge ${
                                marks.average >= 50
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {marks.average}%
                            </span>

                          </td>

                          <td>

                            <span
                              className={`badge ${
                                grade === "F"
                                  ? "bg-danger"
                                  : grade === "A+" ||
                                    grade === "A"
                                  ? "bg-success"
                                  : "bg-primary"
                              }`}
                            >
                              {grade}
                            </span>

                          </td>

                          <td>

                            <div className="d-flex gap-2">

                              <button
                                className="btn btn-sm btn-outline-info"
                                onClick={() =>
                                  handleView(
                                    student
                                  )
                                }
                                title="View student"
                              >
                                👁️
                              </button>

                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  handleEdit(
                                    student
                                  )
                                }
                                title="Edit student"
                              >
                                ✏️
                              </button>

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDelete(
                                    student.id
                                  )
                                }
                                title="Delete student"
                              >
                                🗑️
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

      {/* STUDENT DETAILS MODAL */}

      {selectedStudent && (

        <div
          className="modal d-block"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.55)",
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div className="modal-content">

              <div className="modal-header">

                <div>

                  <h5 className="modal-title">
                    👤 Student Profile
                  </h5>

                  <small className="text-muted">
                    Complete student information
                  </small>

                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedStudent(null)
                  }
                ></button>

              </div>

              <div className="modal-body">

                {/* PROFILE HEADER */}

                <div className="card border-primary mb-4">

                  <div className="card-body">

                    <div className="row align-items-center">

                      <div className="col-md-2 text-center">

                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                          style={{
                            width: "80px",
                            height: "80px",
                            fontSize: "35px",
                          }}
                        >
                          👤
                        </div>

                      </div>

                      <div className="col-md-7">

                        <h3 className="mb-1">
                          {selectedStudent.name}
                        </h3>

                        <p className="text-muted mb-1">
                          {selectedStudent.course}
                        </p>

                        <span className="badge bg-secondary">
                          {selectedStudent.id}
                        </span>

                      </div>

                      <div className="col-md-3 text-md-end mt-3 mt-md-0">

                        <small className="text-muted d-block">
                          Grade
                        </small>

                        <h2 className="text-success mb-0">

                          {getGrade(
                            getMarks(
                              selectedStudent
                            ).average
                          )}

                        </h2>

                      </div>

                    </div>

                  </div>

                </div>

                {/* BASIC INFORMATION */}

                <h5 className="mb-3">
                  👤 Basic Information
                </h5>

                <div className="row g-3 mb-4">

                  <div className="col-md-6">

                    <div className="card h-100">

                      <div className="card-body">

                        <small className="text-muted">
                          Email
                        </small>

                        <p className="mb-0 fw-semibold">
                          {selectedStudent.email || "-"}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="card h-100">

                      <div className="card-body">

                        <small className="text-muted">
                          Phone
                        </small>

                        <p className="mb-0 fw-semibold">
                          {selectedStudent.phone || "-"}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="card h-100">

                      <div className="card-body">

                        <small className="text-muted">
                          Department
                        </small>

                        <p className="mb-0 fw-semibold">
                          {selectedStudent.department || "-"}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="card h-100">

                      <div className="card-body">

                        <small className="text-muted">
                          Course
                        </small>

                        <p className="mb-0 fw-semibold">
                          {selectedStudent.course || "-"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* PERFORMANCE */}

                <h5 className="mb-3">
                  📊 Performance Overview
                </h5>

                <div className="row g-3 mb-4">

                  <div className="col-md-4">

                    <div className="card border-primary text-center h-100">

                      <div className="card-body">

                        <small className="text-muted">
                          Attendance
                        </small>

                        <h2 className="text-primary">

                          {Number(
                            selectedStudent.attendance || 0
                          )}%

                        </h2>

                        <span
                          className={`badge ${
                            getAttendanceStatus(
                              Number(
                                selectedStudent.attendance || 0
                              )
                            ).className
                          }`}
                        >
                          {
                            getAttendanceStatus(
                              Number(
                                selectedStudent.attendance || 0
                              )
                            ).text
                          }
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="card border-success text-center h-100">

                      <div className="card-body">

                        <small className="text-muted">
                          Average Marks
                        </small>

                        <h2 className="text-success">

                          {
                            getMarks(
                              selectedStudent
                            ).average
                          }%

                        </h2>

                        <small>
                          Out of 100
                        </small>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="card border-warning text-center h-100">

                      <div className="card-body">

                        <small className="text-muted">
                          Performance
                        </small>

                        <h4 className="text-warning mt-2">

                          {
                            getPerformance(
                              getMarks(
                                selectedStudent
                              ).average
                            )
                          }

                        </h4>

                        <span className="badge bg-dark">

                          Grade{" "}

                          {
                            getGrade(
                              getMarks(
                                selectedStudent
                              ).average
                            )
                          }

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* SUBJECT MARKS */}

                <h5 className="mb-3">
                  📝 Subject Marks
                </h5>

                <div className="table-responsive mb-4">

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
                          Performance
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {[
                        {
                          name: "Python",
                          value:
                            getMarks(
                              selectedStudent
                            ).python,
                        },

                        {
                          name: "JavaScript",
                          value:
                            getMarks(
                              selectedStudent
                            ).javascript,
                        },

                        {
                          name: "Database",
                          value:
                            getMarks(
                              selectedStudent
                            ).database,
                        },

                        {
                          name: "Web Development",
                          value:
                            getMarks(
                              selectedStudent
                            ).webDevelopment,
                        },
                      ].map((subject) => (

                        <tr key={subject.name}>

                          <td>
                            <strong>
                              {subject.name}
                            </strong>
                          </td>

                          <td>
                            {subject.value}/100
                          </td>

                          <td>

                            <span
                              className={`badge ${
                                subject.value >= 80
                                  ? "bg-success"
                                  : subject.value >= 50
                                  ? "bg-primary"
                                  : "bg-danger"
                              }`}
                            >

                              {subject.value >= 80
                                ? "Excellent"
                                : subject.value >= 50
                                ? "Pass"
                                : "Fail"}

                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

                {/* TOTAL */}

                <div className="alert alert-light border">

                  <div className="d-flex justify-content-between align-items-center">

                    <strong>
                      Total Marks
                    </strong>

                    <strong>

                      {
                        getMarks(
                          selectedStudent
                        ).total
                      } / 400

                    </strong>

                  </div>

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedStudent(null)
                  }
                >
                  Close
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {

                    handleEdit(
                      selectedStudent
                    );

                    setSelectedStudent(null);

                  }}
                >
                  ✏️ Edit Student
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* INFORMATION */}

      <div className="card shadow-sm mt-4">

        <div className="card-body">

          <h5>
            📌 Student Management Features
          </h5>

          <ul className="mb-0">

            <li>
              Add new student records.
            </li>

            <li>
              Edit existing student information.
            </li>

            <li>
              View complete student profiles.
            </li>

            <li>
              Search by name, ID or email.
            </li>

            <li>
              Filter students by department and course.
            </li>

            <li>
              Enter and manage student attendance.
            </li>

            <li>
              Enter marks for all four subjects.
            </li>

            <li>
              Grade and performance are calculated automatically.
            </li>

            <li>
              Attendance and marks are preserved when editing.
            </li>

            <li>
              Student data is stored in browser localStorage.
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default Students;