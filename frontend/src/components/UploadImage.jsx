import { useState } from "react";
import api from "../api/api";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);

      const response = await api.post("/caption", formData);

      if (response.data.duplicate) {

          const uploadAgain = window.confirm(
              "⚠️ This image already exists.\n\nDo you want to upload it again?"
          );

          if (!uploadAgain) {
              return;
          }
      }

      setCaption(response.data.caption);

    } catch (error) {
      alert("Upload failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      <h2>Upload Image</h2>

      <br />

      <label className="file-label">

      Choose Image

      <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
      />

      </label>

      <br />
      <br />

      {preview && (
        <img

            src={preview}

            alt="preview"

            className="preview"

        />
      )}

      <br />
      <br />

      <button
          onClick={handleUpload}
          disabled={loading}
      >
          {loading ? "⏳ Generating Caption..." : "🤖 Generate Caption"}
      </button>

      <br />
      <br />

      {loading && (
          <p
              style={{
                  marginTop:"20px",
                  color:"#2563eb",
                  fontWeight:"bold"
              }}
          >
              <p className="loading">
                  🤖 AI is analyzing your image...
              </p>
          </p>
      )}

      {caption && (
        <>
          <h3>✨ AI Caption</h3>

              <br/>

              <p
              style={{
              fontSize:"18px",
              color:"#334155"
              }}
              >
              <div className="caption-box">
                  {caption}
              </div>
              </p>
        </>
      )}

    </div>
  );
}

export default UploadImage;