import "./App.css";
import Sidebar from "./components/Sidebar";
import Students from "./components/Students";

function App() {
  return (
    <div className="app">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">

        {/* Top Navbar */}
        <nav className="top-navbar">
          <h4>Dashboard</h4>

          <div className="admin-profile">
            👤 Admin
          </div>
        </nav>

        {/* Dashboard */}
        <div className="dashboard-container">

          <h2>
            Welcome Back, Admin 👋
          </h2>

          <p className="text-muted">
            Here's what's happening with your students today.
          </p>

          {/* Statistics */}
          <div className="row mt-4">

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="stat-card">
                <div>
                  <p>Total Students</p>
                  <h2>120</h2>
                </div>

                <div className="stat-icon">
                  👨‍🎓
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="stat-card">
                <div>
                  <p>Total Courses</p>
                  <h2>8</h2>
                </div>

                <div className="stat-icon">
                  📚
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="stat-card">
                <div>
                  <p>Departments</p>
                  <h2>5</h2>
                </div>

                <div className="stat-icon">
                  🏢
                </div>
              </div>
            </div>

          </div>

          {/* Students Section */}
          <div className="students-section mt-4">

            <Students />

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;