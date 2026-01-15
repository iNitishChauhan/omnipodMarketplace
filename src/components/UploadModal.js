import { useEffect, useRef, useState } from 'react';
import '../App.css';
import uploadIcon1 from '../images/upload_icon1.png';
import uploadIcon2 from '../images/upload_icon2.png';
import docuSignLogo from '../images/docu_sign.png';
import profileImage from '../images/creator-image.png';

function UploadModal({ isOpen, onClose }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);


  const handleFiles = (fileList) => {
    const file = Array.from(fileList || [])[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('');
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

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
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);
      if (nextProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [selectedFile]);

  if (!isOpen) {
    return null;
  }

  const showInitial = !selectedFile && !isUploading;
  const showProgress = isUploading;
  const showPreview = selectedFile && !isUploading;
  const isVideo = selectedFile?.type?.startsWith('video');

  return (
    <div className="upload-modal" role="dialog" aria-modal="true" aria-label="Upload content">
      <div className="upload-modal__overlay" onClick={onClose} />
      <div
        className={`upload-modal__content${dragActive ? ' is-dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h3 className="upload-modal__title">Upload <span>Content</span></h3>
        <div className="upload-modal__divider" />

        {showInitial && (
          <>
            <div className="upload-modal__icons">
              <img src={uploadIcon1} alt="Upload photos" />
              <img src={uploadIcon2} alt="Upload videos" />
            </div>
            <p className="upload-modal__hint">Drag photos and videos here</p>
          </>
        )}

        {showProgress && (
          <div className="upload-modal__progress">
            <div className="upload-modal__progress-bar">
              <span className="upload-modal__progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="upload-modal__progress-text">Uploading... {progress}%</p>
          </div>
        )}

        {showPreview && previewUrl && (
          <div className="upload-modal__layout">
            <div className="upload-modal__media">
              {isVideo ? (
                <video src={previewUrl} controls />
              ) : (
                <img src={previewUrl} alt={selectedFile?.name || 'Upload preview'} />
              )}
            </div>
            <div className="upload-modal__form">
              <div className="upload-modal__user">
                <img src={profileImage} alt="Russel M" />
                <strong>Russel M</strong>
              </div>
              <label className="upload-modal__label" htmlFor="contentName">Insert Content Name</label>
              <input id="contentName" type="text" className="upload-modal__text" placeholder="Insert Content Name" maxLength={100} />
              <div className="upload-modal__count">0/100</div>

              <select className="upload-modal__select" aria-label="Select Theme">
                <option>Select Theme</option>
              </select>

              <div className="upload-modal__checks">
                <label className="upload-modal__check">
                  <input type="checkbox" />
                  <span>I have read and understand the <a href="#guidelines">Content Guidelines</a></span>
                </label>
                <div className="upload-modal__docu">
                  <label className="upload-modal__check">
                    <input type="checkbox" />
                    <span>Sign <a href="#agreement">document agreement</a></span>
                  </label>
                  <img src={docuSignLogo} alt="DocuSign" />
                </div>
              </div>

              <button type="button" className="upload-modal__submit">Submit</button>
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
              className="upload-modal__input"
            />
            <button type="button" className="upload-modal__btn" onClick={handleSelectClick} disabled={isUploading}>
              Select from computer
            </button>
            <br />
            <button type="button" className="upload-modal__link">View current theme</button>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadModal;
