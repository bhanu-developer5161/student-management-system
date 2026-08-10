import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">

      <Sidebar />

      <div className="main-content">

        <nav className="top-navbar">
          <h4>Dashboard</h4>

          <div className="admin-profile">
            👤 Admin
          </div>
        </nav>

        <div className="dashboard-container">

          <h2>
            Welcome Back, Admin 👋
          </h2>

          <p className="text-muted">
            Here's what's happening with your students today.
          </p>

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

          <div className="card shadow-sm">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h4>
                  Recent Students
                </h4>

                <button className="btn btn-primary">
                  + Add Student
                </button>

              </div>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td>ST001</td>
                      <td>Rahul Kumar</td>
                      <td>rahul@example.com</td>
                      <td>B.Sc Computer Science</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>ST002</td>
                      <td>Priya Sharma</td>
                      <td>priya@example.com</td>
                      <td>BCA</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>ST003</td>
                      <td>Arjun Reddy</td>
                      <td>arjun@example.com</td>
                      <td>B.Sc Mathematics</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;