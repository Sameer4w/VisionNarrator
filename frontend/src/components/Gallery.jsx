import { useState } from "react";
import { motion } from "framer-motion";
import { FaImages } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../api/api";

function Gallery({ images, refreshGallery }) {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Delete Image?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Delete"
    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/images/${id}`);

      refreshGallery();

      toast.success("Image deleted.");

    } catch (error) {

      console.error(error);

      toast.error("Delete failed.");

    }

  };

  return (

    <motion.section
      className="card gallery-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      <h2 className="section-title">
        <FaImages />
        Image Gallery
      </h2>

      {
        images.length === 0 ? (

          <div className="empty-state">

            <FaImages size={70} />

            <h3>No Images Uploaded</h3>

            <p>
              Upload your first image to start building your AI gallery.
            </p>

          </div>

        ) : (

          <div className="image-grid">

            {images.map((image, index) => (

              <motion.div
                key={image.id}
                className="image-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >

                <img
                  src={`http://127.0.0.1:8000/uploads/${image.filename}`}
                  alt={image.filename}
                  className="search-image"
                  onClick={() => setSelectedImage(image)}
                />

                <div className="image-info">

                  <h3>{image.filename}</h3>

                  <p>
                    <strong>Caption:</strong> {image.caption}
                  </p>

                  <p>
                    <strong>Uploaded:</strong>{" "}
                    {new Date(image.uploaded_at).toLocaleString()}
                  </p>

                  <button
                    className="danger-btn"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete
                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        )
      }

      {
        selectedImage && (

          <div
            className="image-modal"
            onClick={() => setSelectedImage(null)}
          >

            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="close-btn"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>

              <img
                src={`http://127.0.0.1:8000/uploads/${selectedImage.filename}`}
                alt={selectedImage.filename}
              />

              <h2>{selectedImage.filename}</h2>

              <p>
                <strong>Caption:</strong> {selectedImage.caption}
              </p>

              <p>
                <strong>Uploaded:</strong>{" "}
                {new Date(selectedImage.uploaded_at).toLocaleString()}
              </p>

            </div>

          </div>

        )
      }

    </motion.section>

  );

}

export default Gallery;