import { useState } from "react";
import api from "../api/api";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { motion } from "framer-motion";

import {
  FaSearch,
  FaTrash,
  FaImage,
  FaTimes
} from "react-icons/fa";

function SearchImages({ refreshGallery }) {

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [searched, setSearched] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

    const handleSearch = async () => {

    if (!query.trim()) {

      toast.error("Enter a search query.");

      return;

    }

    try {

      setLoading(true);

      const response = await api.get(
        "/search",
        {
          params: {
            query
          }
        }
      );

      setResults(response.data);

      setSearched(true);

      toast.success(
        `${response.data.length} images found`
      );

    } catch (error) {

      console.error(error);

      toast.error("Search failed.");

    } finally {

      setLoading(false);

    }

  };

    const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Image?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      confirmButtonText: "Delete"

    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/images/${id}`);

      setResults(
        results.filter(
          image => image.id !== id
        )
      );

      refreshGallery();

    toast.success(
        "Image deleted successfully."
    );

    } catch (error) {

      console.error(error);

      toast.error("Delete failed.");

    }

  };

    const openImage = (image) => {

    setSelectedImage(image);

  };

  const closeImage = () => {

    setSelectedImage(null);

  };

  return (

    <motion.section
      id="search"
      className="card search-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      <h2 className="section-title">
        <FaSearch /> Semantic Image Search
      </h2>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search using natural language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={handleSearch}
        >
          <FaSearch />
          Search
        </button>

      </div>

      {
        loading && (

          <div className="ai-loader">

            <div className="spinner"></div>

            <p>Searching images...</p>

          </div>

        )
      }

      {
        searched &&
        !loading &&
        results.length === 0 && (

          <div className="empty-state">

            <FaImage size={60} />

            <h3>No matching images found</h3>

            <p>Try another keyword.</p>

          </div>

        )
      }

      <div className="image-grid">

        {
          results.map((image, index) => (

            <motion.div
              key={image.id}
              className="image-card"
              initial={{
                opacity: 0,
                y: 25
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.1
              }}
            >

              <img
                src={`http://127.0.0.1:8000/uploads/${image.filename}`}
                alt={image.filename}
                className="search-image"
                onClick={() => openImage(image)}
              />

              <div className="image-info">

                <h3>{image.filename}</h3>

                <p>

                  <strong>Caption:</strong>

                  {image.caption}

                </p>

                <div className="score-box">

                  <span>

                    Similarity

                  </span>

                  <strong>

                    {(image.score * 100).toFixed(1)}%

                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${image.score * 100}%`
                    }}
                  ></div>

                </div>

                <button
                  className="danger-btn"
                  onClick={() => handleDelete(image.id)}
                >

                  <FaTrash />

                  Delete

                </button>

              </div>

            </motion.div>

          ))
        }

      </div>

      {
        selectedImage && (

          <div
            className="image-modal"
            onClick={closeImage}
          >

            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="close-btn"
                onClick={closeImage}
              >

                <FaTimes />

              </button>

              <img
                src={`http://127.0.0.1:8000/uploads/${selectedImage.filename}`}
                alt={selectedImage.filename}
              />

              <h2>

                {selectedImage.filename}

              </h2>

              <p>

                <strong>Caption:</strong>

                {selectedImage.caption}

              </p>

              <p>

                <strong>Similarity:</strong>

                {(selectedImage.score * 100).toFixed(1)}%

              </p>

            </div>

          </div>

        )
      }

    </motion.section>

  );

}

export default SearchImages;