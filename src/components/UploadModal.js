import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../App.css";
import uploadIcon1 from "../images/upload_icon1.png";
import uploadIcon2 from "../images/upload_icon2.png";
import docuSignLogo from "../images/docu_sign.png";
import profileImage from "../images/creator-image.png";
import { API_URL } from "./URLS";

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
  const [postCopy, setpostCopy] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [agreeGuidelines, setAgreeGuidelines] = useState(false);
  const [agreeDocument, setAgreeDocument] = useState(false);
  const [agreementId, setAgreementId] = useState(null);
  const [agreementStatus, setAgreementStatus] = useState("not_started");
  const [agreementContentName, setAgreementContentName] = useState("");
  const [signingBusy, setSigningBusy] = useState(false);
  const [fileError, setFileError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const getMediaDetail = async () => {
    try {
      let mid = localStorage.getItem("mid");
      const res = await axios.get(`${API_URL}media/${mid}`);
      setContentName(res.data.media.title);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getMediaDetail();
    }
  }, [isOpen]);

  // ---------------- FILE HANDLING ----------------
  const handleFiles = (fileList) => {
    const file = Array.from(fileList || [])[0];

    if (!file) return;

    const allowedTypes = ["image/", "video/"];

    const isValid = allowedTypes.some(type =>
      file.type.startsWith(type)
    );

    if (!isValid) {
      setFileError("Only image and video files are allowed!");
      setSelectedFile(null);
      return;
    }

    setFileError("");
    setValidationErrors((errors) => ({ ...errors, file: "" }));
    setSelectedFile(file);
    if (agreementId) {
      setAgreementId(null);
      setAgreementContentName("");
      setAgreementStatus("not_started");
      setAgreeDocument(false);
    }
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

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  const checkAgreementStatus = useCallback(async (id) => {
    try {
      const response = await axios.get(`${API_URL}docusign/agreements/${id}`, {
        headers: authHeaders(),
      });
      const agreement = response.data.agreement;
      setAgreementStatus(agreement.status);
      setAgreeDocument(agreement.signed);
      return agreement;
    } catch (error) {
      setApiError(error.response?.data?.message || "Unable to verify the DocuSign agreement");
      return null;
    }
  }, []);

  useEffect(() => {
    const handleDocusignMessage = (event) => {
      if (event.origin !== window.location.origin || event.data?.type !== "docusign-callback") {
        return;
      }
      if (Number(event.data.agreementId) !== Number(agreementId)) {
        return;
      }

      setAgreementStatus(event.data.status || "verifying");
      setAgreeDocument(Boolean(event.data.signed));
      checkAgreementStatus(agreementId);
    };

    window.addEventListener("message", handleDocusignMessage);
    return () => window.removeEventListener("message", handleDocusignMessage);
  }, [agreementId, checkAgreementStatus]);

  useEffect(() => {
    const verifyOnFocus = () => {
      if (agreementId && !agreeDocument) {
        checkAgreementStatus(agreementId);
      }
    };
    window.addEventListener("focus", verifyOnFocus);
    return () => window.removeEventListener("focus", verifyOnFocus);
  }, [agreementId, agreeDocument, checkAgreementStatus]);

  const startDocusignSigning = async () => {
    if (!selectedFile || !contentName.trim()) {
      setValidationErrors((errors) => ({
        ...errors,
        file: selectedFile ? "" : "Please select an image or video.",
        contentName: contentName.trim() ? "" : "Please enter the content name.",
      }));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      setApiError("Please log in again before starting DocuSign");
      return;
    }

    const signingWindow = window.open("", "docusign-signing", "width=1100,height=760,resizable=yes,scrollbars=yes");
    if (!signingWindow) {
      setApiError("Allow popups for this site to open DocuSign");
      return;
    }

    try {
      setSigningBusy(true);
      setApiError("");
      setAgreementStatus("creating");

      let response;
      if (agreementId && agreementContentName === contentName) {
        response = await axios.post(
          `${API_URL}docusign/agreements/${agreementId}/recipient-view`,
          {},
          { headers: authHeaders() }
        );
      } else {
        const fileBytes = await selectedFile.arrayBuffer();
        const digest = await window.crypto.subtle.digest("SHA-256", fileBytes);
        const fileSha256 = Array.from(new Uint8Array(digest))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        response = await axios.post(
          `${API_URL}docusign/agreements`,
          {
            content_name: contentName.trim(),
            file_name: selectedFile.name,
            file_size: selectedFile.size,
            file_sha256: fileSha256,
          },
          { headers: authHeaders() }
        );
        setAgreementId(response.data.agreement.id);
        setAgreementContentName(contentName.trim());
        setAgreementStatus(response.data.agreement.status);
      }

      signingWindow.location.href = response.data.signing_url;
      signingWindow.focus();
    } catch (error) {
      signingWindow.close();
      setAgreementStatus("error");
      setApiError(error.response?.data?.message || "Unable to start DocuSign");
    } finally {
      setSigningBusy(false);
    }
  };

  const handleContentNameChange = (event) => {
    const nextName = event.target.value;
    setContentName(nextName);
    if (nextName.trim()) {
      setValidationErrors((errors) => ({ ...errors, contentName: "" }));
    }
    if (agreementId && nextName !== agreementContentName) {
      setAgreementId(null);
      setAgreementContentName("");
      setAgreementStatus("not_started");
      setAgreeDocument(false);
    }
  };

  const handlePostCopyChange = (event) => {
    const nextPostCopy = event.target.value;
    setpostCopy(nextPostCopy);
    if (nextPostCopy.trim()) {
      setValidationErrors((errors) => ({ ...errors, postCopy: "" }));
    }
  };

  const handleThemeChange = (event) => {
    const nextTheme = event.target.value;
    setTheme(nextTheme);
    if (nextTheme) {
      setValidationErrors((errors) => ({ ...errors, theme: "" }));
    }
  };

  const handleGuidelinesChange = (event) => {
    const checked = event.target.checked;
    setAgreeGuidelines(checked);
    if (checked) {
      setValidationErrors((errors) => ({ ...errors, agreeGuidelines: "" }));
    }
  };

  const validateUploadForm = () => {
    const errors = {};

    if (!selectedFile) errors.file = "Please select an image or video.";
    if (!contentName.trim()) errors.contentName = "Please enter the content name.";
    if (!postCopy.trim()) errors.postCopy = "Please enter the post copy.";
    if (!theme) errors.theme = "Please select a theme.";
    if (!agreeGuidelines) errors.agreeGuidelines = "Please accept the content guidelines.";
    if (!agreeDocument) errors.agreeDocument = "Please sign the document agreement.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

    if (!validateUploadForm()) {
      return;
    }
    try {
      setApiLoading(true);
      setApiError("");

      const token = localStorage.getItem("token");

      // ✅ USER ID (Redux first, fallback localStorage)
      if (!user?.id) {
        setApiError("User not authenticated");
        return;
      }

      const formData = new FormData();
      if (localStorage.getItem("mid")) {
        formData.append("mid", localStorage.getItem("mid"));
        localStorage.removeItem("mid")
      }
      formData.append("agreement_id", agreementId);
      formData.append("title", contentName);
      formData.append("post_copy", postCopy);
      formData.append("themes", theme);
      formData.append("file", selectedFile);
      formData.append("content", "");
      formData.append(
        "media_type",
        selectedFile.type.startsWith("video") ? "video" : "image"
      );

      const response = await axios.post(
        API_URL + "media/upload",
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
      setpostCopy("");
      setAgreeGuidelines(false);
      setAgreeDocument(false);
      setAgreementId(null);
      setAgreementStatus("not_started");
      setAgreementContentName("");
      setValidationErrors({});
      onClose();
      // ✅ RELOAD PAGE AFTER UPLOAD
      window.location.reload();
    } catch (error) {
      const validationError = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat()[0]
        : null;
      setApiError(validationError || error.response?.data?.message || "Upload failed");
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
            {fileError && (
              <p className="upload-modal__error">
                {fileError}
              </p>
            )}
            {validationErrors.file && (
              <p className="upload-modal__error">
                {validationErrors.file}
              </p>
            )}
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

              <div class="modal-flex"><label className="upload-modal__label">
                Insert Content Name <span className="upload-modal__required">*</span>
              </label>
              <input
                className={`upload-modal__text${validationErrors.contentName ? " has-error" : ""}`}
                type="text"
                value={contentName}
                onChange={handleContentNameChange}
                disabled={agreeDocument}
                maxLength={100}
                placeholder="Insert Content Name"
              /><div className="upload-modal__count">{contentName.length}/100</div>
              </div>
                {validationErrors.contentName && <p className="upload-modal__field-error">{validationErrors.contentName}</p>}
                
              
              <label className="upload-modal__label">
                Post Copy <span className="upload-modal__required">*</span>
              </label>
              <input
                className={`upload-modal__text${validationErrors.postCopy ? " has-error" : ""}`}
                type="text"
                value={postCopy}
                onChange={handlePostCopyChange}
                maxLength={100}
                placeholder="Post Copy"
              />
              {validationErrors.postCopy && <p className="upload-modal__field-error">{validationErrors.postCopy}</p>}

              <div className="modal-flex2"><label className="upload-modal__label">
                Theme <span className="upload-modal__required">*</span>
              </label>
              <select
                className={`upload-modal__select${validationErrors.theme ? " has-error" : ""}`}
                value={theme}
                onChange={handleThemeChange}
              >
                <option value="">Select Theme</option>
                <option value="Pod Change">Pod Change</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Work">Work</option>
                <option value="Holiday">Holiday</option>
                <option value="Travel">Travel</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Why I chose Omnipod">Why I chose Omnipod</option>
                <option value="Unboxing">Unboxing</option>
                <option value="WDD">WDD</option>
                <option value="No theme">No theme</option>
              </select></div>
              {validationErrors.theme && <p className="upload-modal__field-error">{validationErrors.theme}</p>}

              <div className="upload-modal__checks">
                <label className="upload-modal__check">
                  <input
                    type="checkbox"
                    checked={agreeGuidelines}
                    onChange={handleGuidelinesChange}
                  />
                  <span> I have read the{" "}
                    <a href="/content-guidelines" target="_blank">Content Guidelines</a>
                    <span className="upload-modal__required">*</span>
                  </span>
                </label>
                {validationErrors.agreeGuidelines && <p className="upload-modal__field-error">{validationErrors.agreeGuidelines}</p>}

                <div className="upload-modal__check upload-modal__docusign-check">
                  <input
                    type="checkbox"
                    checked={agreeDocument}
                    onChange={startDocusignSigning}
                    disabled={signingBusy || agreeDocument}
                    aria-describedby="docusign-status"
                  />
                  <span>
                    Sign{" "}
                    <button type="button" onClick={startDocusignSigning} disabled={signingBusy || agreeDocument}>
                      document agreement
                    </button>
                    <span className="upload-modal__required">*</span>
                    <small id="docusign-status">
                      {agreeDocument ? "Signed and verified" : signingBusy ? "Opening DocuSign..." : agreementStatus.replaceAll("_", " ")}
                    </small>
                  </span>
                  <img src={docuSignLogo} alt="DocuSign" width="100px" />
                </div>
                {validationErrors.agreeDocument && <p className="upload-modal__field-error">{validationErrors.agreeDocument}</p>}
              </div>

              {apiError && <p className="upload-modal__error">{apiError}</p>}

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
