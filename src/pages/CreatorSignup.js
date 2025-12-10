import '../App.css';
import signupBg from '../images/signupbg.png';
import Footer from '../components/Footer';
import SignupHeader from '../components/SignupHeader';

function CreatorSignup() {
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

      <section className="creator-form">
        <div className="creator-form__inner">
          <p className="creator-form__note"><span className="required">*</span>Indicates required field</p>

          <form className="creator-form__fields">
            <div className="creator-form__row creator-form__row--2">
              <div className="creator-field">
                <label htmlFor="firstName"><span className="required">*</span>First Name</label>
                <input id="firstName" type="text" className="creator-input" />
              </div>
              <div className="creator-field">
                <label htmlFor="lastName"><span className="required">*</span>Last Name</label>
                <input id="lastName" type="text" className="creator-input" />
              </div>
            </div>

            <div className="creator-field">
              <label htmlFor="email"><span className="required">*</span>Email Address</label>
              <input id="email" type="email" className="creator-input" defaultValue="jane@domain.com" />
            </div>

            <div className="creator-form__row creator-form__row--2">
              <div className="creator-field">
                <label htmlFor="phone">Phone Number <span className="creator-field__optional">(optional)</span></label>
                <div className="creator-phone">
                  <select className="creator-phone__code" aria-label="Country code">
                    <option value="+44">+44</option>
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                  </select>
                  <input id="phone" type="tel" className="creator-input creator-phone__number" />
                </div>
              </div>

              <div className="creator-field">
                <label htmlFor="product"><span className="required">*</span>Product</label>
                <select id="product" className="creator-input">
                  <option>Omnipod 5, Omnipod DASH, System etc</option>
                  <option>Omnipod 5</option>
                  <option>Omnipod DASH</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="creator-field">
              <label className="creator-field__legend"><span className="required">*</span>Social Media Handles</label>
              <div className="creator-social-grid">
                <div className="creator-social-row">
                  <input type="text" className="creator-input" placeholder="Instagram" />
                  <input type="text" className="creator-input" placeholder="Handle" />
                </div>
                <div className="creator-social-row">
                  <input type="text" className="creator-input" placeholder="TikTok" />
                  <input type="text" className="creator-input" placeholder="Handle" />
                </div>
                <div className="creator-social-row">
                  <input type="text" className="creator-input" placeholder="Youtube" />
                  <input type="text" className="creator-input" placeholder="Handle" />
                </div>
              </div>
            </div>

            <div className="creator-checks">
              <label className="creator-check">
                <input type="checkbox" />
                <span><span className="required">*</span>I agree that Insulet International reserves the right to edit content during approval stages</span>
              </label>
              <label className="creator-check">
                <input type="checkbox" />
                <span><span className="required">*</span>I understand that Insulet International will be in touch before any content is used/posted</span>
              </label>
              <label className="creator-check">
                <input type="checkbox" />
                <span>
                  <span className="required">*</span>I agree to Insulet International&apos;s <a className="creator-policy" href="#policy">social media policy</a>
                </span>
              </label>
            </div>
          </form>
        </div>
      </section>

      <section className="creator-password">
        <div className="creator-password__inner">
          <div className="creator-field">
            <label htmlFor="createPassword"><span className="required">*</span>Create Password</label>
            <input id="createPassword" type="password" className="creator-input" />
          </div>
          <div className="creator-field">
            <label htmlFor="confirmPassword"><span className="required">*</span>Confirm Password</label>
            <input id="confirmPassword" type="password" className="creator-input" />
          </div>
        </div>
      </section>

      <section className="creator-submit">
        <div className="creator-submit__inner">
          <h3>
            <span className="creator-submit__title">Submit form</span>
            <span className="creator-submit__subtitle">and sign up</span>
          </h3>
          <button type="button" className="creator-submit__btn">Submit</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CreatorSignup;
