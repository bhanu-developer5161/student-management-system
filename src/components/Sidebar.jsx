import React from "react";

function Sidebar({ activePage, setActivePage }) {

  const menuItems = [
    {
      id: "dashboard",
      icon: "📊",
      label: "Dashboard",
    },
    {
      id: "students",
      icon: "👨‍🎓",
      label: "Students",
    },
    {
      id: "attendance",
      icon: "📋",
      label: "Attendance",
    },
    {
      id: "marks",
      icon: "📝",
      label: "Marks",
    },
    {
      id: "courses",
      icon: "📚",
      label: "Courses",
    },
    {
      id: "departments",
      icon: "🏢",
      label: "Departments",
    },
    {
      id: "reports",
      icon: "📈",
      label: "Reports",
    },
  ];


  return (
    <aside className="sidebar">

      {/* =========================
          LOGO
      ========================== */}

      <div className="sidebar-header">

        <h3>
          🎓 SMS
        </h3>

        <p>
          Student Management
        </p>

      </div>


      {/* =========================
          NAVIGATION
      ========================== */}

      <nav className="sidebar-menu">

        {menuItems.map((item) => (

          <button
            key={item.id}
            type="button"
            className={`sidebar-item ${
              activePage === item.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(item.id)
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>

          </button>

        ))}

      </nav>


      {/* =========================
          ADMIN
      ========================== */}

      <div className="sidebar-footer">

        <div className="admin-info">

          <div className="admin-avatar">
            👤
          </div>

          <div>

            <strong>
              Admin
            </strong>

            <small>
              Administrator
            </small>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;