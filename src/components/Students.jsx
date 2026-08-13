import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          {
            id: 1,
            name: "Bhanu Suma",
            rollNo: "STU001",
            email: "bhanu@example.com",
            course: "Python Full Stack",
            department: "Computer Science",
          },
          {
            id: 2,
            name: "Priya Sharma",
            rollNo: "STU002",
            email: "priya@example.com",
            course: "Web Development",
            department: "Information Technology",
          },
          {
            id: 3,
            name: "Rahul Kumar",
            rollNo: "STU003",
            email: "rahul@example.com",
            course: "Data Science",
            department: "Data Science",
          },
        ];
  });

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    course: "",
    department: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      rollNo: "",
      email: "",
      course: "",
      department: "",
    });

    setEditingStudent(null);
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.rollNo.trim() ||
      !formData.email.trim() ||
      !formData.course.trim() ||
      !formData.department.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingStudent) {
      setStudents(
        students.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                ...formData,
              }
            : student
        )
      );

      alert("Student updated successfully!");
    } else {
      const newStudent = {
        id: Date.now(),
        ...formData,
      };

      setStudents([
        ...students,
        newStudent,
      ]);

      alert("Student added successfully!");
    }

    resetForm();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);

    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      email: student.email,
      course: student.course,
      department: student.department,
    });

    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    setStudents(
      students.filter(
        (student) => student.id !== id
      )
    );
  };

  const filteredStudents = students.filter(
    (student) => {
      const searchText =
        search.toLowerCase();

      return (
        student.name
          .toLowerCase()
          .includes(searchText) ||
        student.rollNo
          .toLowerCase()
          .includes(searchText) ||
        student.email
          .toLowerCase()
          .includes(searchText) ||
        student.course
          .toLowerCase()
          .includes(searchText) ||
        student.department
          .toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <div className="card shadow-sm">

      <div className="card-body">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3>
              👨‍🎓 Student Management
            </h3>

            <p className="text-muted mb-0">
              Manage student records and
              information.
            </p>

          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingStudent(null);

              setFormData({
                name: "",
                rollNo: "",
                email: "",
                course: "",
                department: "",
              });

              setShowForm(true);
            }}
          >
            + Add Student
          </button>

        </div>


        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-4 mb-3">

            <div className="card border-primary">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Total Students
                </p>

                <h3 className="text-primary">
                  {students.length}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4 mb-3">

            <div className="card border-success">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Active Students
                </p>

                <h3 className="text-success">
                  {students.length}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4 mb-3">

            <div className="card border-info">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Departments
                </p>

                <h3 className="text-info">
                  {
                    new Set(
                      students.map(
                        (student) =>
                          student.department
                      )
                    ).size
                  }
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* Add / Edit Form */}

        {showForm && (
          <div className="card border mb-4">

            <div className="card-body">

              <h5 className="mb-3">

                {editingStudent
                  ? "✏️ Edit Student"
                  : "➕ Add Student"}

              </h5>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Student Name *
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


                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Roll Number *
                    </label>

                    <input
                      type="text"
                      name="rollNo"
                      className="form-control"
                      placeholder="Example: STU004"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Course *
                    </label>

                    <input
                      type="text"
                      name="course"
                      className="form-control"
                      placeholder="Enter course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Department *
                    </label>

                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      placeholder="Enter department"
                      value={
                        formData.department
                      }
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="btn btn-success me-2"
                >
                  {editingStudent
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
            placeholder="🔍 Search students..."
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

                <th>#</th>

                <th>Name</th>

                <th>Roll No</th>

                <th>Email</th>

                <th>Course</th>

                <th>Department</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student, index) => (

                    <tr key={student.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {student.name}
                        </strong>
                      </td>

                      <td>
                        <span className="badge bg-primary">
                          {student.rollNo}
                        </span>
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>
                        {student.department}
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() =>
                            handleEdit(student)
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(
                              student.id
                            )
                          }
                        >
                          🗑️ Delete
                        </button>

                      </td>

                    </tr>

                  )
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

      </div>

    </div>
  );
}

export default Students;