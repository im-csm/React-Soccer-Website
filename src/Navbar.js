import "./Styles/navbar.css";

function Navbar() {
  return (
    <div id="navbar">
      <div id="site-logo">
        <img src="../Images/Logo.svg" alt="League Web UI Logo"/>
      </div>
      <div id="nav-links-container">
        <div className="nav-link">
          <img className="nav-link-logo" src="../Images/schedule.png" alt="Calendar Icon."/>
          <a href="/schedule" className="nav-link-text">Schedule</a>
        </div>
        <div className="nav-link">
          <img className="nav-link-logo" src="../Images/leaderboard.png" alt="Trophy icon."/>
          <a href="/leaderboard" className="nav-link-text">Leaderboard</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;