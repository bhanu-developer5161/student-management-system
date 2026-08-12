import { useState, useEffect } from "react";
import StudentProfile from "./StudentProfile";

function Students() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Student data
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          {
            id: "ST001",
            name: "Rahul Kumar",
            email: "rahul@example.com",
            phone: "9876543210",
            gender: "Male",
            dob: "2002-05-15",
            course: "B.Sc Computer Science",
            department: "Computer Science",
            address: "Hyderabad",
            attendance: 92,
            marks: {
              python: 88,
              database: 82,
              webDevelopment: 86,
              javascript: 84,
            },
          },
          {
            id: "ST002",
            name: "Priya Sharma",
            email: "priya@example.com",
            phone: "9876543211",
            gender: "Female",
            dob: "2003-02-10",
            course: "BCA",
            department: "Computer Science",
            address: "Vijayawada",
            attendance: 95,
            marks: {
              python: 91,
              database: 89,
              webDevelopment: 94,
              javascript: 90,
            },
          },
        ];
  });

  // Form data
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    course: "",
    department: "",
    address: "",
    attendance: 0,
    marks: {
      python: 0,
      database: 0,
      webDevelopment: 0,
      javascript: 0,
    },
  });

  // Save students to LocalStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Handle normal input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle marks input
  const handleMarksChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      marks: {
        ...formData.marks,
        [name]: value,
      },
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      course: "",
      department: "",
      address: "",
      attendance: 0,
      marks: {
        python: 0,
        database: 0,
        webDevelopment: 0,
        javascript: 0,
      },
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Add / Update student
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.id ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.gender ||
      !formData.dob ||
      !formData.course ||
      !formData.department
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Convert attendance and marks to numbers
    const studentData = {
      ...formData,
      attendance: Number(formData.attendance),
      marks: {
        python: Number(formData.marks.python),
        database: Number(formData.marks.database),
        webDevelopment: Number(
          formData.marks.webDevelopment
        ),
        javascript: Number(
          formData.marks.javascript
        ),
      },
    };

    // Update student
    if (editingId) {
      const updatedStudents = students.map((student) =>
        student.id === editingId
          ? studentData
          : student
      );

      setStudents(updatedStudents);
    } else {
      // Check duplicate Student ID
      const studentExists = students.some(
        (student) => student.id === formData.id
      );

      if (studentExists) {
        alert("Student ID already exists.");
        return;
      }

      setStudents([
        ...students,
        studentData,
      ]);
    }

    resetForm();
  };

  // Edit student
  const handleEdit = (student) => {
    setFormData({
      id: student.id || "",
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      gender: student.gender || "",
      dob: student.dob || "",
      course: student.course || "",
      department: student.department || "",
      address: student.address || "",
      attendance: student.attendance || 0,
      marks: {
        python: student.marks?.python || 0,
        database: student.marks?.database || 0,
        webDevelopment:
          student.marks?.webDevelopment || 0,
        javascript:
          student.marks?.javascript || 0,
      },
    });

    setEditingId(student.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete student
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedStudents = students.filter(
      (student) => student.id !== id
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
        .includes(search.toLowerCase()) ||
      student.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Show Student Profile
  if (selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h3>Students</h3>

            <p className="text-muted mb-0">
              Manage student information
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
              ? "Close Form"
              : "+ Add Student"}
          </button>

        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="card bg-light mb-4">

            <div className="card-body">

              <h4 className="mb-4">
                {editingId
                  ? "Edit Student"
                  : "Add New Student"}
              </h4>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  {/* Student ID */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Student ID *
                    </label>

                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="ST003"
                      disabled={
                        editingId !== null
                      }
                    />

                  </div>

                  {/* Full Name */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter full name"
                    />

                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="student@example.com"
                    />

                  </div>

                  {/* Phone */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Phone *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="9876543210"
                    />

                  </div>

                  {/* Gender */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Gender *
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>

                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Date of Birth *
                    </label>

                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="form-control"
                    />

                  </div>

                  {/* Course */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Course *
                    </label>

                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="form-select"
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
                    </select>

                  </div>

                  {/* Department */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Department *
                    </label>

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">
                        Select Department
                      </option>

                      <option value="Computer Science">
                        Computer Science
                      </option>

                      <option value="Mathematics">
                        Mathematics
                      </option>

                      <option value="Commerce">
                        Commerce
                      </option>
                    </select>

                  </div>

                  {/* Address */}
                  <div className="col-12 mb-3">

                    <label className="form-label">
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      placeholder="Enter address"
                    ></textarea>

                  </div>

                  {/* Attendance */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Attendance (%)
                    </label>

                    <input
                      type="number"
                      name="attendance"
                      value={formData.attendance}
                      onChange={handleChange}
                      className="form-control"
                      min="0"
                      max="100"
                    />

                  </div>

                </div>

                {/* Marks Section */}
                <h5 className="mt-3 mb-3">
                  Subject Marks
                </h5>

                <div className="row">

                  {/* Python */}
                  <div className="col-md-3 mb-3">

                    <label className="form-label">
                      Python
                    </label>

                    <input
                      type="number"
                      name="python"
                      value={
                        formData.marks.python
                      }
                      onChange={handleMarksChange}
                      className="form-control"
                      min="0"
                      max="100"
                    />

                  </div>

                  {/* Database */}
                  <div className="col-md-3 mb-3">

                    <label className="form-label">
                      Database
                    </label>

                    <input
                      type="number"
                      name="database"
                      value={
                        formData.marks.database
                      }
                      onChange={handleMarksChange}
                      className="form-control"
                      min="0"
                      max="100"
                    />

                  </div>

                  {/* Web Development */}
                  <div className="col-md-3 mb-3">

                    <label className="form-label">
                      Web Development
                    </label>

                    <input
                      type="number"
                      name="webDevelopment"
                      value={
                        formData.marks.webDevelopment
                      }
                      onChange={handleMarksChange}
                      className="form-control"
                      min="0"
                      max="100"
                    />

                  </div>

                  {/* JavaScript */}
                  <div className="col-md-3 mb-3">

                    <label className="form-label">
                      JavaScript
                    </label>

                    <input
                      type="number"
                      name="javascript"
                      value={
                        formData.marks.javascript
                      }
                      onChange={handleMarksChange}
                      className="form-control"
                      min="0"
                      max="100"
                    />

                  </div>

                </div>

                {/* Buttons */}
                <button
                  type="submit"
                  className="btn btn-success me-2"
                >
                  {editingId
                    ? "Update Student"
                    : "Save Student"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              </form>

            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by student ID, name or email..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        {/* Student Table */}
        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Department</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map((student) => (

                  <tr key={student.id}>

                    <td>{student.id}</td>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.phone}</td>

                    <td>{student.course}</td>

                    <td>{student.department}</td>

                    <td>
                      <span className="badge bg-success">
                        {student.attendance || 0}%
                      </span>
                    </td>

                    <td>

                      {/* View */}
                      <button
                        className="btn btn-sm btn-outline-info me-2"
                        onClick={() =>
                          setSelectedStudent(student)
                        }
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() =>
                          handleEdit(student)
                        }
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDelete(student.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center text-muted py-4"
                  >
                    No students found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Student Count */}
        <div className="mt-3 text-muted">

          Total Students:{" "}
          <strong>{students.length}</strong>

        </div>

      </div>
    </div>
  );
}

export default Students;