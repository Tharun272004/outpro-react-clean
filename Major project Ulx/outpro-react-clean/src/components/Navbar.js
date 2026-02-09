import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     document.body.setAttribute(
//       "data-theme",
//       darkMode ? "dark" : "light"
//     );
//   }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">
          Outpro<span>.India</span>
        </h2>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          {/* <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="/partners">Partners</Link></li> */}
        </ul>

        {/* <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button> */}
      </div>
    </nav>
  );
}

export default Navbar;
