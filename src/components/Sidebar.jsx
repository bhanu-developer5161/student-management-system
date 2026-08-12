function Sidebar({
  activePage,
  setActivePage,
}) {
  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-header">

        <h4>
          Student Management
        </h4>

        <p>
          Admin Panel
        </p>

      </div>


      {/* Navigation */}

      <div className="sidebar-menu">

        {/* Dashboard */}

        <button
          type="button"
          className={
            activePage === "dashboard"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            handleNavigation("dashboard")
          }
        >
          <span>📊</span>

          <span>Dashboard</span>
        </button>


        {/* Students */}

        <button
          type="button"
          className={
            activePage === "students"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            handleNavigation("students")
          }
        >
          <span>👨‍🎓</span>

          <span>Students</span>
        </button>


        {/* Attendance */}

        <button
          type="button"
          className={
            activePage === "attendance"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            handleNavigation("attendance")
          }
        >
          <span>📋</span>

          <span>Attendance</span>
        </button>


        {/* Marks */}

        <button
          type="button"
          className={
            activePage === "marks"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            handleNavigation("marks")
          }
        >
          <span>📝</span>

          <span>Marks</span>
        </button>


        {/* Courses */}

        <button
          type="button"
          className="sidebar-item"
          onClick={() =>
            alert("Courses module coming soon!")
          }
        >
          <span>📚</span>

          <span>Courses</span>
        </button>


        {/* Departments */}

        <button
          type="button"
          className="sidebar-item"
          onClick={() =>
            alert(
              "Departments module coming soon!"
            )
          }
        >
          <span>🏢</span>

          <span>Departments</span>
        </button>


        {/* Reports */}

        <button
          type="button"
          className="sidebar-item"
          onClick={() =>
            alert(
              "Reports module coming soon!"
            )
          }
        >
          <span>📈</span>

          <span>Reports</span>
        </button>

      </div>


      {/* Footer */}

      <div className="sidebar-footer">

        <small>
          Student Management System
        </small>

        <small>
          React.js Project
        </small>

      </div>

    </aside>
  );
}

export default Sidebar;