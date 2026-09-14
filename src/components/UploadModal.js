import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../App.css";
import uploadIcon1 from "../images/upload_icon1.png";
import uploadIcon2 from "../images/upload_icon2.png";
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
  const [agreementPostCopy, setAgreementPostCopy] = useState("");
  const [signingBusy, setSigningBusy] = useState(false);
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [isAdult, setIsAdult] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [agreementErrors, setAgreementErrors] = useState({});
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
      resetAgreement();
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

  const resetAgreement = () => {
    setAgreementId(null);
    setAgreementContentName("");
    setAgreementPostCopy("");
    setAgreementStatus("not_started");
    setAgreeDocument(false);
  };

  const fileSha256 = async (file) => {
    const fileBytes = await file.arrayBuffer();
    const digest = await window.crypto.subtle.digest("SHA-256", fileBytes);

    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const openAgreementModal = () => {
    if (!selectedFile || !contentName.trim()) {
      setValidationErrors((errors) => ({
        ...errors,
        file: selectedFile ? "" : "Please select an image or video.",
        contentName: contentName.trim() ? "" : "Please enter the content name.",
      }));
      return;
    }

    if (!postCopy.trim()) {
      setValidationErrors((errors) => ({
        ...errors,
        postCopy: "Please enter the post copy.",
      }));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      setApiError("Please log in again before signing the agreement.");
      return;
    }

    setApiError("");
    setAgreementModalOpen(true);
  };

  const validateAgreementForm = () => {
    const errors = {};

    if (!isAdult) {
      errors.isAdult = "Please answer the age confirmation.";
    }

    if (isAdult === "no" && !guardianEmail.trim()) {
      errors.guardianEmail = "Parent/legal guardian email is required.";
    }

    if (isAdult === "no" && guardianEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guardianEmail.trim())) {
      errors.guardianEmail = "Please enter a valid guardian email.";
    }

    if (!consentAccepted) {
      errors.consentAccepted = "Please accept the agreement consent.";
    }

    setAgreementErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const completeAgreement = async () => {
    if (!validateAgreementForm()) {
      return;
    }

    try {
      setSigningBusy(true);
      setApiError("");
      setAgreementStatus("creating");

      const response = await axios.post(
        `${API_URL}docusign/agreements`,
        {
          content_name: contentName.trim(),
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          file_sha256: await fileSha256(selectedFile),
          post_copy: postCopy.trim(),
          is_adult: isAdult === "yes",
          guardian_email: isAdult === "no" ? guardianEmail.trim() : "",
          consent_accepted: consentAccepted,
        },
        { headers: authHeaders() }
      );

      setAgreementId(response.data.agreement.id);
      setAgreementContentName(contentName.trim());
      setAgreementPostCopy(postCopy.trim());
      setAgreementStatus(response.data.agreement.status);
      setAgreeDocument(Boolean(response.data.agreement.signed));
      setValidationErrors((errors) => ({ ...errors, agreeDocument: "" }));
      setAgreementModalOpen(false);
    } catch (error) {
      setAgreementStatus("error");
      setApiError(error.response?.data?.message || "Unable to create agreement");
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
      resetAgreement();
    }
  };

  const handlePostCopyChange = (event) => {
    const nextPostCopy = event.target.value;
    setpostCopy(nextPostCopy);
    if (nextPostCopy.trim()) {
      setValidationErrors((errors) => ({ ...errors, postCopy: "" }));
    }
    if (agreementId && nextPostCopy !== agreementPostCopy) {
      resetAgreement();
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
    if (!agreeDocument) errors.agreeDocument = "Please complete the document agreement.";

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
      setAgreementPostCopy("");
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

              <div className="modal-flex"><label className="upload-modal__label">
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
                    onChange={openAgreementModal}
                    disabled={signingBusy || agreeDocument}
                    aria-describedby="agreement-status"
                  />
                  <span>
                    Sign{" "}
                    <button type="button" onClick={openAgreementModal} disabled={signingBusy || agreeDocument}>
                      document agreement
                    </button>
                    <span className="upload-modal__required">*</span>
                    <small id="agreement-status">
                      {agreeDocument ? "Agreement completed" : signingBusy ? "Creating agreement..." : agreementStatus.replaceAll("_", " ")}
                    </small>
                  </span>
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

      {agreementModalOpen && (
        <div className="agreement-modal" role="dialog" aria-modal="true" aria-labelledby="agreement-modal-title">
          <div className="agreement-modal__panel">
            <button
              type="button"
              className="agreement-modal__close"
              onClick={() => setAgreementModalOpen(false)}
              aria-label="Close agreement"
              disabled={signingBusy}
            >
              x
            </button>
            <h4 id="agreement-modal-title">Content Permission Agreement</h4>
            <p className="agreement-modal__intro">
              Review and confirm the agreement details below. A completed PDF agreement will be generated for this upload.
            </p>

            <div className="agreement-modal__summary">
              <p><strong>Full Name:</strong> {user?.name || "Podder"}</p>
              <p><strong>Email:</strong> {user?.email || "-"}</p>
              <p><strong>Content:</strong> {contentName}</p>
              <p><strong>Quote:</strong> {postCopy}</p>
              <p><strong>File:</strong> {selectedFile?.name}</p>
            </div>

            <div className="agreement-modal__field">
              <span className="agreement-modal__label">
                Is the person in the image/video 18 years of age or older?
                <span className="upload-modal__required">*</span>
              </span>
              <label>
                <input
                  type="radio"
                  name="is_adult"
                  value="yes"
                  checked={isAdult === "yes"}
                  onChange={() => {
                    setIsAdult("yes");
                    setAgreementErrors((errors) => ({ ...errors, isAdult: "", guardianEmail: "" }));
                  }}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="is_adult"
                  value="no"
                  checked={isAdult === "no"}
                  onChange={() => {
                    setIsAdult("no");
                    setAgreementErrors((errors) => ({ ...errors, isAdult: "" }));
                  }}
                />
                No
              </label>
              {agreementErrors.isAdult && <p className="upload-modal__field-error">{agreementErrors.isAdult}</p>}
            </div>

            {isAdult === "no" && (
              <div className="agreement-modal__field">
                <label className="agreement-modal__label" htmlFor="guardian-email">
                  Parent/Legal Guardian Email
                  <span className="upload-modal__required">*</span>
                </label>
                <input
                  id="guardian-email"
                  className={`agreement-modal__input${agreementErrors.guardianEmail ? " has-error" : ""}`}
                  type="email"
                  value={guardianEmail}
                  onChange={(event) => {
                    setGuardianEmail(event.target.value);
                    setAgreementErrors((errors) => ({ ...errors, guardianEmail: "" }));
                  }}
                  placeholder="guardian@example.com"
                />
                {agreementErrors.guardianEmail && <p className="upload-modal__field-error">{agreementErrors.guardianEmail}</p>}
              </div>
            )}

            <label className="agreement-modal__consent">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(event) => {
                  setConsentAccepted(event.target.checked);
                  setAgreementErrors((errors) => ({ ...errors, consentAccepted: "" }));
                }}
              />
              <span>
                I confirm that I am the original creator of this content, or have permission to submit it, and grant Insulet permission to use, edit, reproduce, and share this content across its social media and digital channels worldwide.
                <span className="upload-modal__required">*</span>
              </span>
            </label>
            {agreementErrors.consentAccepted && <p className="upload-modal__field-error">{agreementErrors.consentAccepted}</p>}

            <p className="agreement-modal__signature">
              Signature will be recorded as: <strong>{user?.name || "Podder"}</strong>
            </p>

            <div className="agreement-modal__actions">
              <button type="button" onClick={() => setAgreementModalOpen(false)} disabled={signingBusy}>
                Cancel
              </button>
              <button type="button" className="agreement-modal__submit" onClick={completeAgreement} disabled={signingBusy}>
                {signingBusy ? "Creating PDF..." : "Accept & Generate PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadModal;
