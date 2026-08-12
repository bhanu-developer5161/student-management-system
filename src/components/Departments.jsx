import { useEffect, useState } from "react";

function Departments() {
  const [departments, setDepartments] = useState(() => {
    const savedDepartments =
      localStorage.getItem("departments");

    return savedDepartments
      ? JSON.parse(savedDepartments)
      : [
          {
            id: 1,
            name: "Computer Science",
            code: "CSE",
            head: "Dr. Ravi Kumar",
            students: 45,
            courses: 4,
          },
          {
            id: 2,
            name: "Information Technology",
            code: "IT",
            head: "Dr. Priya Sharma",
            students: 35,
            courses: 3,
          },
          {
            id: 3,
            name: "Data Science",
            code: "DS",
            head: "Dr. Anil Kumar",
            students: 25,
            courses: 3,
          },
        ];
  });

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingDepartment, setEditingDepartment] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    head: "",
    students: "",
    courses: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "departments",
      JSON.stringify(departments)
    );
  }, [departments]);

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
      head: "",
      students: "",
      courses: "",
    });

    setEditingDepartment(null);
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.head.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingDepartment) {
      const updatedDepartments =
        departments.map((department) =>
          department.id ===
          editingDepartment.id
            ? {
                ...department,
                name: formData.name,
                code: formData.code,
                head: formData.head,
                students:
                  Number(formData.students) || 0,
                courses:
                  Number(formData.courses) || 0,
              }
            : department
        );

      setDepartments(updatedDepartments);

      alert(
        "Department updated successfully!"
      );
    } else {
      const newDepartment = {
        id: Date.now(),
        name: formData.name,
        code: formData.code,
        head: formData.head,
        students:
          Number(formData.students) || 0,
        courses:
          Number(formData.courses) || 0,
      };

      setDepartments([
        ...departments,
        newDepartment,
      ]);

      alert(
        "Department added successfully!"
      );
    }

    resetForm();
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);

    setFormData({
      name: department.name,
      code: department.code,
      head: department.head,
      students: department.students,
      courses: department.courses,
    });

    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) {
      return;
    }

    setDepartments(
      departments.filter(
        (department) =>
          department.id !== id
      )
    );
  };

  const filteredDepartments =
    departments.filter(
      (department) =>
        department.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        department.code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        department.head
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalStudents =
    departments.reduce(
      (total, department) =>
        total +
        Number(department.students || 0),
      0
    );

  const totalCourses =
    departments.reduce(
      (total, department) =>
        total +
        Number(department.courses || 0),
      0
    );

  return (
    <div className="card shadow-sm">

      <div className="card-body">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3>
              🏢 Department Management
            </h3>

            <p className="text-muted mb-0">
              Manage academic departments
              and department information.
            </p>

          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingDepartment(null);

              setFormData({
                name: "",
                code: "",
                head: "",
                students: "",
                courses: "",
              });

              setShowForm(true);
            }}
          >
            + Add Department
          </button>

        </div>


        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-4 mb-3">

            <div className="card border-primary">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Total Departments
                </p>

                <h3 className="text-primary">
                  {departments.length}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4 mb-3">

            <div className="card border-success">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Total Students
                </p>

                <h3 className="text-success">
                  {totalStudents}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4 mb-3">

            <div className="card border-info">

              <div className="card-body">

                <p className="text-muted mb-1">
                  Total Courses
                </p>

                <h3 className="text-info">
                  {totalCourses}
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

                {editingDepartment
                  ? "✏️ Edit Department"
                  : "➕ Add Department"}

              </h5>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  {/* Department Name */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Department Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter department name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* Department Code */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Department Code *
                    </label>

                    <input
                      type="text"
                      name="code"
                      className="form-control"
                      placeholder="Example: CSE"
                      value={formData.code}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* Department Head */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Department Head *
                    </label>

                    <input
                      type="text"
                      name="head"
                      className="form-control"
                      placeholder="Enter department head"
                      value={formData.head}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* Students */}

                  <div className="col-md-3 mb-3">

                    <label className="form-label">
                      Students
                    </label>

                    <input
                      type="number"
                      name="students"
                      min="0"
                      className="form-control"
                      value={
                        formData.students
                      }
                      onChange={handleChange}
                    />

                  </div>


                  {/* Courses */}

                  <div className="col-md-3 mb-3">

                    <label className="form-label">
                      Courses
                    </label>

                    <input
                      type="number"
                      name="courses"
                      min="0"
                      className="form-control"
                      value={
                        formData.courses
                      }
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="btn btn-success me-2"
                >
                  {editingDepartment
                    ? "Update Department"
                    : "Save Department"}
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
            placeholder="🔍 Search department by name, code or head..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        {/* Department Table */}

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>#</th>

                <th>Department</th>

                <th>Code</th>

                <th>Department Head</th>

                <th>Students</th>

                <th>Courses</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {filteredDepartments.length >
              0 ? (

                filteredDepartments.map(
                  (department, index) => (

                    <tr
                      key={department.id}
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>

                        <strong>
                          {department.name}
                        </strong>

                      </td>

                      <td>

                        <span className="badge bg-primary">
                          {department.code}
                        </span>

                      </td>

                      <td>
                        {department.head}
                      </td>

                      <td>
                        {department.students}
                      </td>

                      <td>
                        {department.courses}
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() =>
                            handleEdit(
                              department
                            )
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(
                              department.id
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
                    No departments found.
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

export default Departments;