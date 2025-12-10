import { useState } from 'react';
import '../App.css';
import headerBg from '../images/header-bg2.jpg';
import stepImage1 from '../images/image1.png';
import stepImage2 from '../images/image2.png';
import stepImage3 from '../images/image3.png';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Where will my content be used? test',
      answer: 'Approved content may appear on Omnipod marketing channels like social media, the website, and select partner placements.',
    },
    {
      question: 'Who will review my content?',
      answer: 'Our Omnipod review team checks every submission for quality, accuracy, and compliance before anything is shared.',
    },
    {
      question: 'Will my content be stored on a secure network?',
      answer: 'Yes. All uploads are stored on secure, access-controlled systems following Omnipod’s data protection standards.',
    },
    {
      question: 'Are there guidelines and regulations I should know before uploading content?',
      answer: 'Please follow Omnipod’s community guidelines: be truthful, respectful, avoid medical claims, and use original assets you own.',
    },
    {
      question: 'Will I be contacted before my content is used?',
      answer: 'Typically yes—we’ll reach out with next steps or approvals when your content is selected for use.',
    },
    {
      question: 'Who owns the rights to my content once I have uploaded it onto the server?',
      answer: 'You keep ownership of your content; you grant Omnipod permission to use it according to the program terms.',
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="home_page">
      <div className="hero">
        <Header />

        <div className="hero__grid">
          <section className="hero__left">
            <h1>Omnipod <br />Creator <br />Marketplace</h1>
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
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(${headerBg})`,
              }}
            />
          </section>
        </div>
      </div>
      <div className="hero_text">
        <h2>Upload your unique content<br /> for a chance to get <span>featured<br /> on Omnipod channels</span></h2>
      </div>
      <div className="homeStep homeStep1">
        <div className="step">
          <div className="step__col step__number">
            <span>1</span>
          </div>
          <div className="step__col step__copy">
            <p>
              Omnipod users upload creative assets. This includes{' '}
              <strong className="step__highlight">videos, photos, and testimonials.</strong>
            </p>
          </div>
          <div className="step__col step__image">
            <div className="step__image-wrap">
              <img src={stepImage1} alt="Creator uploading suitcase" />
            </div>
          </div>
        </div>
      </div>

      <div className="homeStep homeStep2">
        <div className="step step--swap">
          <div className="step__col step__image">
            <div className="step__image-wrap">
              <img src={stepImage2} alt="Reviewer smiling and checking content" />
            </div>
          </div>
          <div className="step__col step__number">
            <span>2</span>
          </div>
          <div className="step__col step__copy">
            <p>
              Omnipod will review and select content.{' '}
              <strong className="step__highlight">Approved content</strong> will then be shared across{' '}
              <strong className="step__highlight">Omnipod&apos;s channels.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="homeStep homeStep3">
        <div className="step">
          <div className="step__col step__number">
            <span>3</span>
          </div>
          <div className="step__col step__copy">
            <p>
              Together we will <strong className="step__highlight">amplify the voice of the community</strong> through
              real lived experiences and <strong className="step__highlight">authentic storytelling.</strong>
            </p>
          </div>
          <div className="step__col step__image">
            <div className="step__image-wrap">
              <img src={stepImage3} alt="Community members listening together" />
            </div>
          </div>
        </div>
      </div>

      <div className="cta-sections">
        <section className="cta-panel cta-panel--primary">
          <h3>Ready to share your content?</h3>
          <button className="cta-pill cta-pill--light">Get Started Now</button>
        </section>

        <section className="cta-panel cta-panel--soft">
          <h3>Already signed-up?</h3>
          <button className="cta-pill">Log In</button>
        </section>

        <section className="cta-panel">
          <h3>Insulet member?</h3>
          <button className="cta-pill">Log In</button>
        </section>
      </div>

      <section className="faq">
        <div className="faq__wrapper">
          <h3 className="faq__title">Any questions?</h3>
          <div className="faq__list">
            {faqs.map((item, idx) => (
              <div className="faq__item" key={item.question}>
                <button
                  className={`faq__toggle ${openIndex === idx ? 'is-open' : ''}`}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="faq__icon">
                    <span className="faq__icon-line faq__icon-line--vertical" />
                    <span className="faq__icon-line faq__icon-line--horizontal" />
                  </span>
                  <span className="faq__question">{item.question}</span>
                </button>
                {openIndex === idx && (
                  <p className="faq__answer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
