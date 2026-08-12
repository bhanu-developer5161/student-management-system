import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");

    return savedCourses
      ? JSON.parse(savedCourses)
      : [
          {
            id: 1,
            name: "Python Full Stack",
            code: "PFS101",
            department: "Computer Science",
            duration: "6 Months",
            students: 35,
          },
          {
            id: 2,
            name: "Web Development",
            code: "WD102",
            department: "Computer Science",
            duration: "6 Months",
            students: 28,
          },
          {
            id: 3,
            name: "Data Science",
            code: "DS103",
            department: "Information Technology",
            duration: "6 Months",
            students: 24,
          },
        ];
  });

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    duration: "",
    students: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "courses",
      JSON.stringify(courses)
    );
  }, [courses]);

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
      code: "",
      department: "",
      duration: "",
      students: "",
    });

    setEditingCourse(null);
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.department.trim() ||
      !formData.duration.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingCourse) {
      const updatedCourses = courses.map(
        (course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                ...formData,
                students:
                  Number(formData.students) || 0,
              }
            : course
      );

      setCourses(updatedCourses);

      alert("Course updated successfully!");
    } else {
      const newCourse = {
        id: Date.now(),
        name: formData.name,
        code: formData.code,
        department: formData.department,
        duration: formData.duration,
        students:
          Number(formData.students) || 0,
      };

      setCourses([
        ...courses,
        newCourse,
      ]);

      alert("Course added successfully!");
    }

    resetForm();
  };

  const handleEdit = (course) => {
    setEditingCourse(course);

    setFormData({
      name: course.name,
      code: course.code,
      department: course.department,
      duration: course.duration,
      students: course.students,
    });

    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    setCourses(
      courses.filter(
        (course) => course.id !== id
      )
    );
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      course.code
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      course.department
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalStudents = courses.reduce(
    (total, course) =>
      total + Number(course.students || 0),
    0
  );

  return (
    <div className="card shadow-sm">

      <div className="card-body">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h3>
              📚 Course Management
            </h3>

            <p className="text-muted mb-0">
              Manage courses offered by the institution.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingCourse(null);

              setFormData({
                name: "",
                code: "",
                department: "",
                duration: "",
                students: "",
              });

              setShowForm(true);
            }}
          >
            + Add Course
          </button>

        </div>


        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-6 mb-3">

            <div className="card border-primary">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Total Courses
                </p>

                <h3 className="text-primary">
                  {courses.length}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-6 mb-3">

            <div className="card border-success">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Students Enrolled
                </p>

                <h3 className="text-success">
                  {totalStudents}
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

                {editingCourse
                  ? "✏️ Edit Course"
                  : "➕ Add Course"}

              </h5>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Course Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter course name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Course Code *
                    </label>

                    <input
                      type="text"
                      name="code"
                      className="form-control"
                      placeholder="Example: CS101"
                      value={formData.code}
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


                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Duration *
                    </label>

                    <input
                      type="text"
                      name="duration"
                      className="form-control"
                      placeholder="Example: 6 Months"
                      value={
                        formData.duration
                      }
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Students
                    </label>

                    <input
                      type="number"
                      name="students"
                      min="0"
                      className="form-control"
                      placeholder="Number of students"
                      value={
                        formData.students
                      }
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="btn btn-success me-2"
                >
                  {editingCourse
                    ? "Update Course"
                    : "Save Course"}
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
            placeholder="🔍 Search by course name, code or department..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        {/* Courses Table */}

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Code</th>
                <th>Department</th>
                <th>Duration</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              {filteredCourses.length > 0 ? (

                filteredCourses.map(
                  (course, index) => (
                    <tr key={course.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {course.name}
                        </strong>
                      </td>

                      <td>
                        <span className="badge bg-primary">
                          {course.code}
                        </span>
                      </td>

                      <td>
                        {course.department}
                      </td>

                      <td>
                        {course.duration}
                      </td>

                      <td>
                        {course.students}
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() =>
                            handleEdit(course)
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(
                              course.id
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
                    No courses found.
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

export default Courses;