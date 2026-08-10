function Sidebar() {
  return (
    <div className="sidebar">

      <h4 className="sidebar-title">
        Student System
      </h4>

      <ul className="sidebar-menu">

        <li className="active">
          📊 Dashboard
        </li>

        <li>
          👨‍🎓 Students
        </li>

        <li>
          📚 Courses
        </li>

        <li>
          📅 Attendance
        </li>

        <li>
          📝 Marks
        </li>

        <li>
          ⚙️ Settings
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;