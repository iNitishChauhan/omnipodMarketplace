import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';

function SocialMediaPolicy() {
  return (
    <div className="policy-page">
      <CreatorHeader />

      <main className="policy-page__main">
        <div className="policy-page__inner">
          <section className="policy-hero">
            <p className="policy-hero__eyebrow">Omnipod Creator Marketplace</p>
            <h1>Social Media Policy</h1>
            <p className="policy-hero__copy">
              This is placeholder policy content for layout and routing. Replace this
              copy later with approved legal and brand guidance.
            </p>
          </section>

          <section className="policy-grid">
            <article className="policy-card">
              <h2>1. Respectful Content</h2>
              <p>
                Creators should publish content that is accurate, respectful, and
                appropriate for public audiences. Avoid misleading claims, offensive
                language, or content that may damage trust in the brand.
              </p>
            </article>

            <article className="policy-card">
              <h2>2. Medical Claims</h2>
              <p>
                Do not make unsupported medical promises or treatment guarantees.
                Personal experiences may be shared, but they should not be presented
                as universal outcomes or professional advice.
              </p>
            </article>

            <article className="policy-card">
              <h2>3. Consent And Privacy</h2>
              <p>
                Obtain permission before featuring other individuals in photos or
                videos. Do not expose private information, patient records, or any
                identifiable data without explicit approval.
              </p>
            </article>

            <article className="policy-card">
              <h2>4. Brand Presentation</h2>
              <p>
                Show products clearly and in a way that aligns with published brand
                guidance. Visuals should feel authentic, well lit, and suitable for
                web, social, and campaign reuse.
              </p>
            </article>

            <article className="policy-card">
              <h2>5. Platform Conduct</h2>
              <p>
                Follow the terms of each social platform you use. Content should not
                include harassment, unsafe behavior, copyright violations, or
                material that could trigger moderation or removal.
              </p>
            </article>

            <article className="policy-card">
              <h2>6. Review Process</h2>
              <p>
                Submitted content may be reviewed, edited, held, or rejected before
                publication. Final approval remains with the brand team, and creators
                may be contacted for revisions or clarification.
              </p>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SocialMediaPolicy;
