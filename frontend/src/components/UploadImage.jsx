import { useState } from "react";
import api from "../api/api";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { motion } from "framer-motion";

import {
  FaCloudUploadAlt,
  FaCopy,
  FaDownload,
  FaTrash,
  FaMagic
} from "react-icons/fa";

function UploadImage({

    refreshGallery

}) {

  const [selectedFile, setSelectedFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const [dragging, setDragging] = useState(false);

    const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));

    setCaption("");
  };

    const handleDrop = (e) => {

    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));

    setCaption("");
  };

    const copyCaption = () => {

    navigator.clipboard.writeText(caption);

    toast.success("Caption copied!");
  };

    const downloadCaption = () => {

    const blob = new Blob([caption], {
      type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "caption.txt";

    a.click();

    URL.revokeObjectURL(url);

    toast.success("Caption downloaded!");
  };

    const resetUpload = () => {

    setSelectedFile(null);

    setPreview(null);

    setCaption("");
  };

    const handleUpload = async () => {

    if (!selectedFile) {

      toast.error("Please select an image.");

      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      setLoading(true);

      const response = await api.post(
        "/caption",
        formData
      );

      if (response.data.duplicate) {

        Swal.fire({

          icon: "warning",

          title: "Duplicate Image",

          html: `
            <b>${response.data.message}</b>
            <br><br>
            Existing File:
            <b>${response.data.existing_image.filename}</b>
          `,

          confirmButtonText: "OK"

        });

        return;
      }

      setCaption(response.data.caption);

      toast.success("Caption generated!");

      refreshGallery();

    } catch (error) {
    console.log(error);

    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);

        toast.error(error.response.data.detail || "Server Error");
    } else {
        toast.error(error.message);
    }
} finally {

      setLoading(false);

    }

  };

    return (

    <motion.section
      id="upload"
      className="card upload-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      <h2 className="section-title">
        <FaMagic /> AI Image Caption Generator
      </h2>

      <div
        className={`drop-zone ${dragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >

        <FaCloudUploadAlt
          size={55}
          className="upload-icon"
        />

        <h3>
          Drag & Drop Image
        </h3>

        <p>
          or
        </p>

        <label className="file-label">

          Browse Image

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

        </label>

      </div>

      {
        preview && (

          <motion.div
            className="preview-card"
            initial={{ scale: .9 }}
            animate={{ scale: 1 }}
          >

            <img
              src={preview}
              alt="Preview"
              className="preview"
            />

            <h3>
              {selectedFile.name}
            </h3>

          </motion.div>

        )
      }

      <button
        className="primary-btn upload-btn"
        onClick={handleUpload}
        disabled={loading}
      >

        {
          loading
          ? "🤖 Generating Caption..."
          : "✨ Generate Caption"
        }

      </button>

      {
        loading && (

          <div className="ai-loader">

            <div className="spinner"></div>

            <p>
              AI is analyzing your image...
            </p>

          </div>

        )
      }

      {
        caption && (

          <motion.div
            className="caption-card"
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
          >

            <h3>
              ✨ AI Caption
            </h3>

            <div className="caption-box">

              {caption}

            </div>

            <div className="caption-buttons">

              <button
                className="secondary-btn"
                onClick={copyCaption}
              >

                <FaCopy />

                Copy

              </button>

              <button
                className="secondary-btn"
                onClick={downloadCaption}
              >

                <FaDownload />

                Download

              </button>

              <button
                className="danger-btn"
                onClick={resetUpload}
              >

                <FaTrash />

                Upload Another

              </button>

            </div>

          </motion.div>

        )
      }

    </motion.section>

  );

}

export default UploadImage;