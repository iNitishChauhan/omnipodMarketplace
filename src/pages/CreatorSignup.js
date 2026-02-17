import { useState } from "react";
import axios from "axios";
import "../App.css";
import signupBg from "../images/signupbg.png";
import Footer from "../components/Footer";
import SignupHeader from "../components/SignupHeader";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function CreatorSignup() {
 
    const { isAuthenticated } = useSelector((state) => state.auth);
    
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "jane@domain.com",
    phoneCode: "+44",
    phone: "",
    product: "",
    instagramHandle: "",
    tiktokHandle: "",
    youtubeHandle: "",
    agree1: false,
    agree2: false,
    agree3: false,
    password: "",
    confirmPassword: "",
  });
  
if (isAuthenticated===true) {
    return <Navigate to="/" />;
  }
  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }
};
  const handleChange = (e) => {
   
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    setMessage("");

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setMessage("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!formData.agree1 || !formData.agree2 || !formData.agree3) {
      setMessage("Please accept all agreements");
      return;
    }
    //console.log(profileImage)
     const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: `${formData.phoneCode}${formData.phone}`,
      product: formData.product,
      instagram: formData.instagramHandle,
      tiktok: formData.tiktokHandle,
      youtube: formData.youtubeHandle,
      password: formData.password,
      role: 'podder',
    }; 
    const formDataPayload = new FormData();

// add all payload fields
Object.keys(payload).forEach((key) => {
  formDataPayload.append(key, payload[key]);
});
if (profileImage) {
  formDataPayload.append("profile_image", profileImage);
} 

    try {
      setLoading(true);

      /* const res = await axios({
        method: "post",
        url: "https://omnipodmarketplace.minddigital.in/api/creator-signup",
        data: payload,
      }); */
     /*  const res = await axios.post("https://omnipodmarketplace.minddigital.in/api/creator-signup", payload,

      { headers: { "Content-Type": "application/json", }, });

       */
  const res = await axios.post(
  "http://127.0.0.1:8000/api/creator-signup",
  formDataPayload,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
); 
setMessage("Signup successful 🎉");

      console.log(res.data);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home_page">
      <div className="hero">
        <SignupHeader />

        <div className="hero__grid">
          <section className="hero__left">
            <h1>Sign up as <br />an Omnipod <br />Creator</h1>
            <div className="hero__cta">
              <a className="cta-btn" href="#get-started">
                Get Started
              </a>
            </div>
          </section>

          <section className="hero__right" aria-hidden="true">
            <div
              className="hero__photo"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(${signupBg})`,
              }}
            />
          </section>
        </div>
      </div>

      <div className="hero_text signup_text">
        <h2>Sign up as an Omnipod <br /> Creator by <span>filling in the form <br />below</span></h2>
      </div>
      <form className="creator-form__fields" onSubmit={handleSubmit}>
        <section className="creator-form">
          <div className="creator-form__inner">
            <p className="creator-form__note"><span className="required">*</span>Indicates required field</p>
            <div className="creator-form__row creator-form__row--2">
              <div className="creator-field">
                <label htmlFor="firstName"><span className="required">*</span>First Name</label>

                <input className="creator-input" name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="creator-field">
                <label htmlFor="lastName"><span className="required">*</span>Last Name</label>
                <input className="creator-input" name="lastName" value={formData.lastName} onChange={handleChange} />

              </div>
            </div>

            <div className="creator-field">
              <label htmlFor="email"><span className="required">*</span>Email Address</label>
              <input name="email" value={formData.email} onChange={handleChange} className="creator-input" />
            </div>

            <div className="creator-form__row creator-form__row--2">
              <div className="creator-field">
                <label htmlFor="phone">Phone Number <span className="creator-field__optional">(optional)</span></label>
                <div className="creator-phone">
                  <select className="creator-phone__code" name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
                    <option value="+44">+44</option>
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                  </select>
                  <input name="phone" className="creator-input creator-phone__number" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="creator-field">
                <label htmlFor="product"><span className="required">*</span>Product</label>

                <select className="creator-input" name="product" value={formData.product} onChange={handleChange}>
                  <option value="">Select Product</option>
                  <option value="Omnipod 5">Omnipod 5</option>
                  <option value="Omnipod DASH">Omnipod DASH</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="creator-field">
              <label className="creator-field__legend"><span className="required">*</span>Social Media Handles</label>
              <div className="creator-social-grid">
                <div className="creator-social-row">
                  <input name="instagramHandle" className="creator-input" placeholder="Instagram Handle" onChange={handleChange} />
                  <input name="tiktokHandle" className="creator-input" placeholder="TikTok Handle" onChange={handleChange} />
                  <input name="youtubeHandle" className="creator-input" placeholder="YouTube Handle" onChange={handleChange} />
                </div>
              </div>
            </div>
<div className="creator-field">
  <label>
    Profile Image <span className="creator-field__optional">(optional)</span>
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="creator-input"
  />

  {previewImage && (
    <div style={{ marginTop: "10px" }}>
      <img
        src={previewImage}
        alt="Profile Preview"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "1px solid #ddd",
        }}
      />
    </div>
  )}
</div>

            <div className="creator-checks">
              <label className="creator-check">
                <input type="checkbox" name="agree1" onChange={handleChange} />
                <span><span className="required">*</span>I agree that Insulet International reserves the right to edit content during approval stages</span>
              </label>
              <label className="creator-check">
                <input type="checkbox" name="agree2" onChange={handleChange} />
                <span><span className="required">*</span>I understand that Insulet International will be in touch before any content is used/posted</span>
              </label>
              <label className="creator-check">
                <input type="checkbox" name="agree3" onChange={handleChange} />
                <span>
                  <span className="required">*</span>I agree to Insulet International&apos;s <a className="creator-policy" href="#policy">social media policy</a>
                </span>
              </label>
            </div>

          </div>
        </section>
        <section className="creator-password">
          <div className="creator-password__inner">
            <div className="creator-field">
              <label htmlFor="createPassword"><span className="required">*</span>Create Password</label>
              <input type="password" name="password" className="creator-input" onChange={handleChange} />
            </div>
            <div className="creator-field">
              <label htmlFor="confirmPassword"><span className="required">*</span>Confirm Password</label>
              <input type="password" name="confirmPassword" onChange={handleChange} className="creator-input" />
            </div>
            
          </div>
        </section>
        <section className="creator-submit">
          <div className="creator-submit__inner">
            {message && <p className="form-message">{message}</p>}
            <h3>
              <span className="creator-submit__title">Submit form</span>
              <span className="creator-submit__subtitle">and sign up</span>
            </h3>
            <button type="submit" className="creator-submit__btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </section>
      </form>




      <Footer />
    </div>
  );
}

export default CreatorSignup;
