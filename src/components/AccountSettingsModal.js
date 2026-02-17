import { useEffect, useRef, useState } from "react";
import "../App.css";
import profileImage from "../images/creator-image.png";

function AccountSettingsModal({ isOpen, onClose }) {
  const productOptions = ["Omnipod 5", "Omnipod DASH", "Omnipod GO", "Omnipod View", "Other"];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+44",
    phone: "",
    instagramHandle: "",
    tiktokHandle: "",
    youtubeHandle: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const productDropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (isProductOpen) {
          setIsProductOpen(false);
          return;
        }
        onClose();
      }
    };

    const handleOutsideClick = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setIsProductOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, isProductOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsProductOpen(false);
    }
  }, [isOpen]);

  const handleProductToggle = (value) => {
    setSelectedProducts((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneSanitized = formData.phone.replace(/[\s()+-]/g, "");

    if (!formData.firstName.trim()) nextErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) nextErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email Address is required.";
    else if (!emailRegex.test(formData.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (formData.phone.trim() && !/^\d{6,15}$/.test(phoneSanitized)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (selectedProducts.length === 0) nextErrors.accountProduct = "Please select at least one product.";
    if (!formData.instagramHandle.trim()) nextErrors.instagramHandle = "Instagram handle is required.";
    if (!formData.tiktokHandle.trim()) nextErrors.tiktokHandle = "TikTok handle is required.";
    if (!formData.youtubeHandle.trim()) nextErrors.youtubeHandle = "YouTube handle is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const selectedProductLabel =
    selectedProducts.length > 0 ? selectedProducts.join(", ") : "Select Product";

  if (!isOpen) return null;

  return (
    <div className="account-settings-modal" role="dialog" aria-modal="true">
      <div className="account-settings-modal__overlay" onClick={onClose} />

      <div className="account-settings-modal__content">
        <h3 className="account-settings-modal__title">
          Account <span>Settings</span>
        </h3>
        <div className="account-settings-modal__divider" />

        <div className="account-settings-modal__profile">
          <img src={profileImage} alt="Profile" />
          <div className="account-settings-modal__profile-copy">
            <p>Update Profile Picture</p>
            <input type="file" accept="image/*" />
          </div>
        </div>

        <form
          className="account-settings-modal__form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!validateForm()) return;
            onClose();
          }}
        >
          <div className="creator-form__row creator-form__row--2">
            <div className="creator-field">
              <label htmlFor="accountFirstName">
                <span className="required">*</span>First Name
              </label>
              <input
                id="accountFirstName"
                name="firstName"
                className={`creator-input${errors.firstName ? " account-settings-modal__input-error" : ""}`}
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <small className="account-settings-modal__error">{errors.firstName}</small>}
            </div>
            <div className="creator-field">
              <label htmlFor="accountLastName">
                <span className="required">*</span>Last Name
              </label>
              <input
                id="accountLastName"
                name="lastName"
                className={`creator-input${errors.lastName ? " account-settings-modal__input-error" : ""}`}
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <small className="account-settings-modal__error">{errors.lastName}</small>}
            </div>
          </div>

          <div className="creator-field">
            <label htmlFor="accountEmail">
              <span className="required">*</span>Email Address
            </label>
            <input
              id="accountEmail"
              name="email"
              className={`creator-input${errors.email ? " account-settings-modal__input-error" : ""}`}
              type="email"
              placeholder="jane@domain.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="account-settings-modal__error">{errors.email}</small>}
          </div>

          <div className="creator-form__row creator-form__row--2">
            <div className="creator-field">
              <label htmlFor="accountPhone">
                Phone Number <span className="creator-field__optional">(optional)</span>
              </label>
              <div className="creator-phone">
                <select
                  id="accountPhoneCode"
                  name="phoneCode"
                  className={`creator-phone__code${errors.phone ? " account-settings-modal__input-error" : ""}`}
                  value={formData.phoneCode}
                  onChange={handleChange}
                >
                  <option value="+44">+44</option>
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                </select>
                <input
                  id="accountPhone"
                  name="phone"
                  className={`creator-input${errors.phone ? " account-settings-modal__input-error" : ""}`}
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {errors.phone && <small className="account-settings-modal__error">{errors.phone}</small>}
            </div>

            <div className="creator-field">
              <label htmlFor="accountProduct">
                <span className="required">*</span>Product
              </label>
              <div className="account-settings-modal__product-dropdown" ref={productDropdownRef}>
                <button
                  id="accountProduct"
                  type="button"
                  className={`creator-input account-settings-modal__product-trigger${
                    isProductOpen ? " is-open" : ""
                  }${errors.accountProduct ? " account-settings-modal__input-error" : ""}`}
                  onClick={() => setIsProductOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isProductOpen}
                >
                  <span
                    className={`account-settings-modal__product-value${
                      selectedProducts.length === 0 ? " is-placeholder" : ""
                    }`}
                  >
                    {selectedProductLabel}
                  </span>
            
                </button>

                {isProductOpen && (
                  <div
                    className="account-settings-modal__product-menu"
                    role="listbox"
                    aria-multiselectable="true"
                  >
                    {productOptions.map((option) => (
                      <label className="account-settings-modal__product-option" key={option}>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(option)}
                          onChange={() => {
                            handleProductToggle(option);
                            setErrors((prev) => ({ ...prev, accountProduct: "" }));
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <input type="hidden" name="accountProduct" value={selectedProducts.join(",")} />
              <small className="account-settings-modal__helper">
                Selected options appear as comma-separated values.
              </small>
              {errors.accountProduct && (
                <small className="account-settings-modal__error">{errors.accountProduct}</small>
              )}
            </div>
          </div>

          <div className="creator-field">
            <label className="creator-field__legend">Social Media Handles</label>

            <div className="account-settings-modal__social-grid">
              <div className="account-settings-modal__social-row">
                <input readOnly
                  className="creator-input account-settings-modal__platform"
                  type="text"
                  defaultValue="Instagram"
                />
                <input
                  className={`creator-input${errors.instagramHandle ? " account-settings-modal__input-error" : ""}`}
                  type="text"
                  name="instagramHandle"
                  placeholder="Handle"
                  value={formData.instagramHandle}
                  onChange={handleChange}
                />
              </div>
              {errors.instagramHandle && (
                <small className="account-settings-modal__error">{errors.instagramHandle}</small>
              )}
              <div className="account-settings-modal__social-row">
                <input readOnly
                  className="creator-input account-settings-modal__platform"
                  type="text"
                  defaultValue="TikTok"
                />
                <input
                  className={`creator-input${errors.tiktokHandle ? " account-settings-modal__input-error" : ""}`}
                  type="text"
                  name="tiktokHandle"
                  placeholder="Handle"
                  value={formData.tiktokHandle}
                  onChange={handleChange}
                />
              </div>
              {errors.tiktokHandle && (
                <small className="account-settings-modal__error">{errors.tiktokHandle}</small>
              )}
              <div className="account-settings-modal__social-row">
                <input readOnly
                  className="creator-input account-settings-modal__platform"
                  type="text"
                  defaultValue="Youtube"
                />
                <input
                  className={`creator-input${errors.youtubeHandle ? " account-settings-modal__input-error" : ""}`}
                  type="text"
                  name="youtubeHandle"
                  placeholder="Handle"
                  value={formData.youtubeHandle}
                  onChange={handleChange}
                />
              </div>
              {errors.youtubeHandle && (
                <small className="account-settings-modal__error">{errors.youtubeHandle}</small>
              )}
            </div>
          </div>

          <div className="account-settings-modal__actions">
            <button type="submit" className="account-settings-modal__save">
              Save and close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountSettingsModal;
