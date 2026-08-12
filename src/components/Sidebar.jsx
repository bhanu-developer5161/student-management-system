function Sidebar({
  activePage,
  setActivePage,
}) {
  return (
    <div className="sidebar">

      {/* Header */}

      <div className="sidebar-header">

        <h4>
          Student Management
        </h4>

        <small>
          Admin Panel
        </small>

      </div>


      {/* Menu */}

      <div className="sidebar-menu">

        {/* Dashboard */}

        <button
          className={`sidebar-item ${
            activePage === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("dashboard")
          }
        >
          <span>📊</span>
          Dashboard
        </button>


        {/* Students */}

        <button
          className={`sidebar-item ${
            activePage === "students"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("students")
          }
        >
          <span>👨‍🎓</span>
          Students
        </button>


        {/* Attendance */}

        <button
          className={`sidebar-item ${
            activePage === "attendance"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("attendance")
          }
        >
          <span>📋</span>
          Attendance
        </button>


        {/* Courses */}

        <button
          className="sidebar-item"
          onClick={() =>
            alert("Courses module coming soon!")
          }
        >
          <span>📚</span>
          Courses
        </button>


        {/* Marks */}

        <button
          className="sidebar-item"
          onClick={() =>
            alert("Marks module coming soon!")
          }
        >
          <span>📝</span>
          Marks
        </button>

      </div>

    </div>
  );
}

export default Sidebar;