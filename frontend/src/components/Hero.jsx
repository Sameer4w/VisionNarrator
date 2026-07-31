import { motion } from "framer-motion";
import { FaRobot, FaSearch, FaImage } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <span className="hero-badge">
          🚀 AI Powered Image Intelligence
        </span>

        <h1>
          VisionNarrator <span>AI</span>
        </h1>

        <p>
          Upload images, generate intelligent captions using AI,
          and perform semantic image search with natural language.
        </p>

        <div className="hero-buttons">

          <a href="#upload" className="primary-btn">
            <FaImage />
            Upload Image
          </a>

          <a href="#search" className="secondary-btn">
            <FaSearch />
            Search Images
          </a>

        </div>

        <div className="tech-stack">

          <div className="tech-card">
            <FaRobot />
            <span>BLIP AI</span>
          </div>

          <div className="tech-card">
            🧠
            <span>Sentence Transformers</span>
          </div>

          <div className="tech-card">
            ⚡
            <span>FastAPI</span>
          </div>

          <div className="tech-card">
            ⚛️
            <span>React</span>
          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default Hero;