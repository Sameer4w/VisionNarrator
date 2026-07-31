import { FaRobot } from "react-icons/fa";
import { HiOutlineMoon } from "react-icons/hi";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">

        <FaRobot className="logo-icon" />

        <div>
          <h2>VisionNarrator AI</h2>
          <span>Image Captioning & Semantic Search</span>
        </div>

      </div>

      <ul className="nav-links">
        <li><a href="#upload">Upload</a></li>
        <li><a href="#search">Search</a></li>
        <li><a href="#about">About</a></li>
      </ul>

      <button className="theme-btn" title="Dark Mode (Coming Soon)">
        <HiOutlineMoon size={22} />
      </button>

    </nav>
  );
}

export default Navbar;