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

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <br />
      <br />

      {preview && (
        <img
          src={preview}
          alt="preview"
          width="300"
          style={{ borderRadius: "10px" }}
        />
      )}

      <br />
      <br />

      <button onClick={handleUpload}>
        {loading ? "Generating..." : "Generate Caption"}
      </button>

      <br />
      <br />

      {caption && (
        <>
          <h3>Caption</h3>
          <p>{caption}</p>
        </>
      )}

    </div>
  );
}

export default UploadImage;