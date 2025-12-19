import '../App.css';
import cgBg from '../images/cg-banner.jpg';
import Footer from '../components/Footer';
import SignupHeader from '../components/SignupHeader';
import sp_image from '../images/pp_image1.png';
import pp_image from '../images/pp_image2.jpg';

function ContentGuidelines () {
      return (
        <div className="cg_page">
            <div className="hero">
                <SignupHeader />
                <div className="hero__grid">
                <section className="hero__left">
                    <h1>Content <br />Guidelines</h1>
                </section>

                <section className="hero__right" aria-hidden="true">
                    <div
                    className="hero__photo"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(${cgBg})`,
                    }}
                    />
                </section>
                </div>
            </div>
            <div className="hero_text signup_text cg_text1">
                <h2>See our Content Guidelines <br /><span>before submitted your content</span></h2>
            </div>
            <div className='cg_content1'>
                <ol>
                <li>Natural locations, as opposed to on set.</li>
                <li>Natural, warm light.</li>
                <li>Natural, genuine, and authentic body language.</li>
                <li>Avoid photographing from behind and not showing your face.</li>
                <li>Keep image composition open, uncomplicated, and simple.</li>
                <li>In photography, Pod should always be visible. In video, Pod should be present in every scenario, but does not need to be in every scene.</li>
                <li>All photography and video should be captured at the highest resolution available.</li>
                <li>Capture a range of emotions from full smile to neutral expression.</li>
                <li>Tone should be upbeat and fun.</li>
                </ol>
            </div>
            <div className='sp_bg'>
                <div className='pp_section'>
                    <h3>Pod <span>placement</span></h3>
                    <div className='pp_inner'>
                        <div class="pp_left">
                            <ol>
                                <li>Place Pod horizontally on back, abdomen,and buttocks</li>
                                <li>Place Pod vertically on arm and leg</li>
                                <li>Ensure adhesive is smooth and not wrinkled</li>
                                <li>Do not place Pod over a tattoo</li>
                            </ol>
                        </div>
                        <div class="pp_image"><img src={sp_image} alt="Sensor placement"></img></div>
                    </div>
                </div>
            </div>
            <div className='pp_bg'>
                <div className='pp_section'>
                    <h3>Sensor <span>placement</span></h3>
                    <div className='pp_inner'>
                        <div class="pp_left">
                        <ol>
                            <li>Place sensor horizontally on abdomen</li>
                            <li>Sensor should be placed in close proximity to the Pod</li>
                        </ol>
                        </div>
                        <div class="pp_image"><img src={pp_image} alt="Sensor placement"></img></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      );

}

export default ContentGuidelines;