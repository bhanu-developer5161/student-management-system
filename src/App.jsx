import "./App.css";

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            Student Management System
          </span>

          <span className="text-white">
            Admin
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">

        <h2 className="mb-4">
          Dashboard
        </h2>

        {/* Statistics */}
        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Students</h5>
                <h2>120</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Courses</h5>
                <h2>8</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Departments</h5>
                <h2>5</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Welcome Card */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h4>Welcome to Student Management System</h4>

            <p className="text-muted">
              Manage students, courses, attendance and marks
              from one place.
            </p>

            <button className="btn btn-primary">
              Add Student
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;