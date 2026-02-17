import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../App.css";
import uploadIcon1 from "../images/upload_icon1.png";
import uploadIcon2 from "../images/upload_icon2.png";
import docuSignLogo from "../images/docu_sign.png";
import profileImage from "../images/creator-image.png";

function UploadModal({ isOpen, onClose }) {

  const fileInputRef = useRef(null);

  // ✅ GET USER FROM REDUX
  const { user } = useSelector((state) => state.auth);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [contentName, setContentName] = useState("");
  const [theme, setTheme] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  // ---------------- FILE HANDLING ----------------
  const handleFiles = (fileList) => {
    const file = Array.from(fileList || [])[0];
    if (file) setSelectedFile(file);
  };

  const handleInputChange = (e) => handleFiles(e.target.files);
  const handleSelectClick = () => fileInputRef.current?.click();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  // ---------------- PREVIEW ----------------
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  // ---------------- FAKE PROGRESS ----------------
  useEffect(() => {
    if (!selectedFile) {
      setIsUploading(false);
      setProgress(0);
      return;
    }

    setIsUploading(true);
    setProgress(0);
    const start = Date.now();
    const duration = 4000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (next >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [selectedFile]);

  // ---------------- API UPLOAD ----------------
  const handleSubmit = async () => {
    
    if (!selectedFile || !contentName) {
      alert("File and title are required");
      return;
    }

    try {
      setApiLoading(true);
      setApiError("");

      const token = localStorage.getItem("token");

      // ✅ USER ID (Redux first, fallback localStorage)
      const userId = user?.id || localStorage.getItem("user_id");

      if (!userId) {
        setApiError("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("title", contentName);
      formData.append("file", selectedFile);
      formData.append("content", "");
      formData.append(
        "media_type",
        selectedFile.type.startsWith("video") ? "video" : "image"
      );
      formData.append("status", "draft");

      const response = await axios.post(
        "https://omnipodmarketplace.minddigital.in/api/media/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Success:", response.data);
      alert("Media uploaded successfully");

      // reset state
      setSelectedFile(null);
      setContentName("");
      setTheme("");
      onClose();
       // ✅ RELOAD PAGE AFTER UPLOAD
      window.location.reload();
    } catch (error) {
      setApiError(error.response?.data?.message || "Upload failed");
    } finally {
      setApiLoading(false);
    }
  };

  if (!isOpen) return null;

  const showInitial = !selectedFile && !isUploading;
  const showProgress = isUploading;
  const showPreview = selectedFile && !isUploading;
  const isVideo = selectedFile?.type?.startsWith("video");

  return (
    <div className="upload-modal" role="dialog" aria-modal="true">
      <div className="upload-modal__overlay" onClick={onClose} />

      <div
        className={`upload-modal__content${dragActive ? " is-dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h3 className="upload-modal__title">
          Upload <span>Content</span>
        </h3>

        <div className="upload-modal__divider" />

        {showInitial && (
          <>
            <div className="upload-modal__icons">
              <img src={uploadIcon1} alt="Upload photos" />
              <img src={uploadIcon2} alt="Upload videos" />
            </div>
            <p className="upload-modal__hint">
              Drag photos and videos here
            </p>
          </>
        )}

        {showProgress && (
          <div className="upload-modal__progress">
            <div className="upload-modal__progress-bar">
              <span
                className="upload-modal__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>Uploading... {progress}%</p>
          </div>
        )}

        {showPreview && previewUrl && (
          <div className="upload-modal__layout">
            <div className="upload-modal__media">
              {isVideo ? (
                <video src={previewUrl} controls />
              ) : (
                <img src={previewUrl} alt="Preview" />
              )}
            </div>

            <div className="upload-modal__form">
              <div className="upload-modal__user">
                <img src={profileImage} alt="User" />
                <strong>{user?.name || "Podder"}</strong>
              </div>

              <label className="upload-modal__label">
                Insert Content Name
              </label>
              <input
                className="upload-modal__text"
                type="text"
                value={contentName}
                onChange={(e) => setContentName(e.target.value)}
                maxLength={100}
                placeholder="Insert Content Name"
              />
<div class="upload-modal__count">0/100</div>
              <select
                className="upload-modal__select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="">Select Theme</option>
                <option value="fitness">Fitness</option>
                <option value="health">Health</option>
              </select>

              <div className="upload-modal__checks">
                <label className="upload-modal__check">
                  <input type="checkbox" />
                  <span>
                    I have read the{" "}
                    <a href="#guidelines">Content Guidelines</a>
                  </span>
                </label>

                <div className="upload-modal__check">
                  <label>
                    <input type="checkbox" />
                    <span>
                      Sign <a href="#agreement">document agreement</a>
                    </span>
                  </label>
                  <img src={docuSignLogo} alt="DocuSign" />
                </div>
              </div>

              {apiError && <p style={{ color: "red" }}>{apiError}</p>}

              <button
                className="upload-modal__submit"
                onClick={handleSubmit}
                disabled={apiLoading}
              >
                {apiLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}

        {!showPreview && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleInputChange}
              hidden
            />
            <button onClick={handleSelectClick} className="upload-modal__btn">
              Select from computer
            </button>
            <br />
            <button type="button" className="upload-modal__link">
              View current theme
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadModal;
