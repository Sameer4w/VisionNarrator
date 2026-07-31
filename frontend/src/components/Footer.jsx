import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaReact,
  FaPython
} from "react-icons/fa";

import { SiFastapi, SiPostgresql } from "react-icons/si";

function Footer() {
  return (
    <footer className="footer" id="about">

      <div className="footer-top">

        <div className="footer-brand">

          <h2>🖼 VisionNarrator AI</h2>

          <p>
            AI-powered Image Caption Generator &
            Semantic Search Application built using
            modern Artificial Intelligence and Web
            Technologies.
          </p>

        </div>

        <div className="footer-tech">

          <h3>Built With</h3>

          <div className="tech-icons">

            <span><FaReact /> React</span>

            <span><FaPython /> Python</span>

            <span><SiFastapi /> FastAPI</span>

            <span><SiPostgresql /> PostgreSQL</span>

            <span>🤖 BLIP AI</span>

            <span>🧠 Sentence Transformers</span>

          </div>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © 2026 VisionNarrator AI | Developed by Sameer
        </p>

        <div className="social-links">

          <a href="#" title="GitHub">
            <FaGithub />
          </a>

          <a href="#" title="LinkedIn">
            <FaLinkedin />
          </a>

          <a href="#" title="Email">
            <FaEnvelope />
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;