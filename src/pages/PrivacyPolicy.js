import '../App.css';
import CreatorHeader from '../components/CreatorHeader';
import Footer from '../components/Footer';

const accordionItems = [
  {
    title: 'Omnipod 5 Automated Insulin Delivery System Customers',
    version: 'Version June 2025',
    intro:
      'This section describes how we process personal data of customers using the Omnipod 5 Automated Insulin Delivery System ("Omnipod 5 System").',
    nav: [
      '1.1 What personal data we collect',
      '1.2 Why we process your personal data',
      '1.3 Processing personal data of customers <18 years old',
      '1.4 Sharing of your personal data',
    ],
    sections: [
      {
        heading: '1.1 What personal data we collect',
        paragraphs: [
          'We will collect personal data directly from you, and in some instances from other sources.',
          'Personal data we collect directly from you may include personal and contact details, order details, payment details, technical device information, health data about your diabetes condition and treatment, information you provide when contacting Insulet, and personal data provided when using web-services, applications, websites, surveys, or social media platforms.',
          'Personal data we collect from other sources may include personal and contact details from your health care professional, health data about your diabetes condition and treatment, complaint information, demographic data from data management platforms such as Glooko AB, health insurance information, data from CGM system providers such as Dexcom, and technical usage data collected through cookies or similar technologies.',
        ],
      },
      {
        heading: '1.2 Why we process your personal data',
        paragraphs: [
          'We may use your personal data, including health data, for order and payment management, product support, training on the use of the Omnipod 5 System, setup and use of your Omnipod ID, setup and use of your Omnipod 5 System, use of the online Omnipod account, product research, development and improvement, data sharing with Glooko AB, data sharing with Abbott and its affiliates, evaluating and improving our products and services, marketing communications, complaint investigation, public health and safety obligations, legal obligations, emergency support, identification and authentication, and clinical trial or related research activities.',
          'Where required, we rely on your consent. In some cases, we may continue to process certain personal data where necessary to ensure that the Omnipod 5 System remains safe, secure, and compliant with high standards of quality and safety.',
          'You may withdraw consent at any time by contacting the Omnipod Customer Care Team or by using the applicable privacy webform or online Omnipod account settings.',
        ],
      },
      {
        heading: '1.3 Processing personal data of customers <18 years old',
        paragraphs: [
          'We may process personal data of minors where a customer has not yet reached the age of 18 years old ("dependant"). We process the dependant\'s personal data in accordance with this Privacy Policy.',
          'We request the legal guardian of the dependant to manage the dependant\'s contact and interaction with Insulet, including management of privacy rights, creation of an Omnipod ID, privacy preferences, and access to the online Omnipod account.',
        ],
      },
      {
        heading: '1.4 Sharing of your personal data',
        paragraphs: [
          'We may share your personal data, including health data, with service providers and business partners, IT service providers, Insulet Group companies, Glooko AB where you consent to data sharing, CGM system providers, law enforcement agencies, courts, regulators, public authorities, and asset purchasers where permitted by law.',
        ],
      },
    ],
  },
  {
    title: 'Omnipod System Customers',
    version: 'Version June 2025',
    intro:
      'This section describes how we process personal data of customers using the Omnipod DASH or EROS Insulin Delivery system.',
    nav: [
      '1.1 What personal data we collect',
      '1.2 Why we process your personal data',
      '1.3 Processing personal data of customers <18 years old',
      '1.4 Sharing of your personal data',
    ],
    sections: [
      {
        heading: '1.1 What personal data we collect',
        paragraphs: [
          'We will collect personal data directly from you, and in some instances from other sources.',
          'Personal data collected directly from you may include personal and contact details, order details, payment details, technical device information, health data, personal data provided when contacting Insulet, and personal data provided when using web-services, applications, websites, surveys, or social media platforms.',
          'Personal data collected from other sources may include personal and contact details from your health care professional, health data about your diabetes condition and treatment, health insurance information, data from data management platforms such as Glooko AB, and technical usage data collected through cookies or similar technologies.',
        ],
      },
      {
        heading: '1.2 Why we process your personal data',
        paragraphs: [
          'We may process your personal data, including health data, for order and payment management, product support, training on the use of the Omnipod System, setup and use of your Omnipod ID, use of the online Omnipod account, evaluating and improving products and services, marketing communications, complaint investigation, public health obligations, legal obligations, emergency support, identification and authentication, and clinical trial or related research activities.',
          'Your Omnipod ID is necessary for the online Omnipod account. If you do not consent or withdraw consent for processing necessary for use and maintenance of the Omnipod ID, we cannot provide you with the online Omnipod account.',
        ],
      },
      {
        heading: '1.3 Processing personal data of customers <18 years old',
        paragraphs: [
          'We may process personal data of minors where a customer has not yet reached the age of 18 years old ("dependent"). We request the legal guardian to manage the dependent\'s contact and interaction with Insulet, including privacy rights, consent preferences, and online Omnipod account access.',
        ],
      },
      {
        heading: '1.4 Sharing of your personal data',
        paragraphs: [
          'We may share your personal data, including health data, with service providers and business partners, IT service providers, Insulet Group companies, billing or payment services, insurers, law enforcement agencies, courts, regulators, public authorities, and asset purchasers where permitted by law.',
        ],
      },
    ],
  },
  {
    title: 'Health Care Professionals and Business Contacts',
    version: 'Version June 2025',
    intro:
      'This section describes how we process personal data relating to health care professionals and business contacts.',
    nav: [
      '1.1 What personal data we collect',
      '1.2 Why we process your personal data',
      '1.3 Sharing of your personal data',
    ],
    sections: [
      {
        heading: '1.1 What personal data we collect',
        paragraphs: [
          'The categories of personal data that we may collect about you include personal details, contact details, technical device information, training data and certifications, financial data, authentication data or user credentials, logging details, Insulet customer data relating to past or present patients, and personal data you provide directly when using our web-services, surveys, or social media channels.',
          'We collect this information directly from you or from other sources, including your patients, industry databases where you have consented to sharing, or publicly available sources such as public online profiles.',
        ],
      },
      {
        heading: '1.2 Why we process your personal data',
        paragraphs: [
          'We use your personal data to provide services, respond to requests and inquiries, send marketing communications where permitted, provide training on the use of Omnipod Systems, improve our products and services, support participation in clinical studies, exercise our rights, comply with legal or regulatory obligations, and meet industry self-regulation requirements.',
        ],
      },
      {
        heading: '1.3 Sharing of your personal data',
        paragraphs: [
          'We may share your personal data with service providers and business partners, IT service providers, Insulet Group companies, law enforcement agencies, courts, regulators, government authorities, and asset purchasers where permitted by law.',
          'Your personal data may be transferred to, stored, and processed in a country that is not regarded as ensuring an adequate level of protection under European Union law. We use appropriate safeguards, such as contractual commitments, to protect your data.',
        ],
      },
    ],
  },
  {
    title: 'Omnipod 5 Automated Insulin Delivery System Legal Guardians',
    version: 'Version June 2025',
    intro:
      'This section describes how we process personal data of legal guardians of minor customers using the Omnipod 5 Automated Insulin Delivery System.',
    nav: [
      '1.1 What personal data we collect',
      '1.2 Why we process your personal data',
      '1.3 Sharing of your personal data',
    ],
    sections: [
      {
        heading: '1.1 What personal data we collect',
        paragraphs: [
          'We will collect personal data directly from you, and in some instances from other sources.',
          'Personal data collected directly from you may include personal and contact details, order details, payment details, technical device information, and personal data you provide when using your Omnipod ID, the online Omnipod account, websites, surveys, or social media channels.',
          'Personal data collected from other sources may include personal and contact details from your dependent\'s health care professional, health insurance information, and technical usage data collected through cookies or similar technologies.',
        ],
      },
      {
        heading: '1.2 Why we process your personal data',
        paragraphs: [
          'We may process your personal data for order and payment management, product support, training on the use of the Omnipod 5 System, setup and use of your Omnipod ID, use of the online Omnipod account, marketing communications, public health obligations, legal obligations, exercising our rights, identification and authentication, and clinical trial or related research activities.',
          'Your Omnipod ID is necessary for setup and use of the Omnipod 5 System and for access to the online Omnipod account. If you do not consent or withdraw consent for processing necessary for use and maintenance of the Omnipod ID, we cannot provide the Omnipod 5 System and online Omnipod account.',
        ],
      },
      {
        heading: '1.3 Sharing of your personal data',
        paragraphs: [
          'We may share your personal data, including health data where applicable, with service providers and business partners, IT service providers, Insulet Group companies, billing or payment services, insurers, CGM system providers, law enforcement agencies, courts, regulators, public authorities, and asset purchasers where permitted by law.',
        ],
      },
    ],
  },
];

const mainSections = [
  { id: 'how-we-process', label: 'How we process your personal data' },
  { id: 'privacy-rights', label: 'Your privacy rights' },
  { id: 'information-security', label: 'Information security' },
  { id: 'data-retention', label: 'Data retention' },
  { id: 'international-data-transfers', label: 'International data transfers' },
  { id: 'privacy-policy-changes', label: 'Changes to the Privacy Policy' },
  { id: 'contact-us', label: 'How to contact us' },
];

function PrivacyPolicy() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="privacy-policy-page">
      <CreatorHeader />

      <main className="privacy-policy-page__main">
        <div className="privacy-policy-page__inner">
          <section className="privacy-policy-hero">
            <h1>Insulet Corporation Privacy Policy</h1>
            <p className="privacy-policy-hero__version">Version June 2025</p>
          </section>

          <section className="privacy-policy-copy">
            <p>
              This Privacy Policy describes how Insulet Corporation and the Insulet entity
              that services your country (together: "Insulet", "we", "us", "our") process
              your personal data when you use our products and services, and the rights
              and options you have to control your data. To access the contact details of
              the Insulet entities please click here.
            </p>

            <p>
              Personal data is all information that identifies you directly or in
              combination with other information. We respect the importance of your
              privacy. Please read this Privacy Policy carefully to understand how we
              process your personal data. You can contact us at any time using the
              following privacy webform or at{' '}
              <a href="mailto:dataprivacy@insulet.com">dataprivacy@insulet.com</a> if you
              have any questions or concerns. Please also contact us if the personal data
              that we hold about you is no longer correct.
            </p>

            <div className="privacy-policy-nav">
              <p>Navigate to the relevant section in this Privacy Policy for more information on:</p>
              <ol>
                {mainSections.map((section) => (
                  <li key={section.id}>
                    <button type="button" onClick={() => scrollToSection(section.id)}>
                      {section.label}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <h2 id="how-we-process">1. How we process your personal data</h2>
            <p>
              Please click below to find more specific information on how we process your
              personal data.
            </p>

            <div className="privacy-policy-accordion">
              {accordionItems.map((item, itemIndex) => (
                <details key={item.title} className="privacy-policy-accordion__item">
                  <summary>{item.title}</summary>
                  <div className="privacy-policy-accordion__content">
                    <p className="privacy-policy-accordion__version">{item.version}</p>
                    <p>{item.intro}</p>

                    <ol>
                      {item.nav.map((navItem, navIndex) => (
                        <li key={navItem}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(`privacy-tab-${itemIndex}-section-${navIndex}`)}
                          >
                            {navItem}
                          </button>
                        </li>
                      ))}
                    </ol>

                    {item.sections.map((section, sectionIndex) => (
                      <div
                        className="privacy-policy-accordion__section"
                        id={`privacy-tab-${itemIndex}-section-${sectionIndex}`}
                        key={section.heading}
                      >
                        <h3>{section.heading}</h3>
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <h2 id="privacy-rights">2. Your privacy rights</h2>
            <p>You have certain rights regarding your personal data, subject to local laws. These include the rights to:</p>
            <ul>
              <li>access your personal data;</li>
              <li>rectify your personal data if such data is inaccurate or outdated;</li>
              <li>erase your personal data;</li>
              <li>restrict our processing of your personal data;</li>
              <li>object to our processing of your personal data;</li>
              <li>receive your personal data in a usable electronic format and transmit it to a third party (right to data portability);</li>
              <li>withdraw your consent, if the processing is based on your consent.</li>
            </ul>
            <p>
              If you would like to discuss or exercise such rights, or if you have any
              complaints about our use of your personal data, please contact us using the
              following Privacy Webform. Please note that we may ask for additional
              information before we can respond to your request.
            </p>
            <p>
              In certain situations, we may not be in a position to fully comply with your
              request, for example if you request to delete certain personal data that we
              are legally obliged to keep, for instance pursuant to obligations in
              relation to tax or medical devices. In that case, we will inform you about this.
            </p>
            <p>
              We are committed to working with you to obtain a fair resolution of any
              complaint or concern about privacy. You have the right to make a complaint
              to a data protection authority, e.g., to the data protection authority of
              your country.
            </p>

            <h2 id="information-security">3. Information Security</h2>
            <p>
              We implement and maintain technical and organisational measures to ensure a
              level of security appropriate to the risk to the personal data we process.
              These measures are aimed at ensuring the on-going integrity and
              confidentiality of personal data. Please visit the following page Security
              at Insulet | Insulin Pump Therapy | Omnipod for more information on how
              Insulet keeps your personal data secure.
            </p>

            <h2 id="data-retention">4. Data retention</h2>
            <p>
              We will keep your personal data for as long as this is necessary, for
              instance to maintain the relationship with you. When deciding how long to
              keep your personal data we take into account our legal obligations and
              regulators' expectations, [as well as the amount of time necessary for us to
              maintain records for analysis and audit purposes]. We may also retain
              records to investigate or defend potential legal claims and to deal with
              any complaints raised.
            </p>

            <h2 id="international-data-transfers">5. International data transfers</h2>
            <p>
              The third parties which we share personal data with may be located outside
              the European Economic Area, Switzerland or the United Kingdom, for example
              our group companies, service providers and business partners. These third
              parties may be located in countries that have a lower legal protection
              level for personal data than applicable in the European Economic Area,
              Switzerland or the United Kingdom. We will only provide your personal data
              to third parties that handle your personal data confidentially and provide
              appropriate protection in line with European standards, so that the
              personal data are protected appropriately (e.g. by concluding standard
              contractual clauses for the transfer of personal data to third countries as
              approved by the European Commission, or the governments of Switzerland or
              the United Kingdom, as applicable). For more information on the appropriate
              safeguards in place, please contact us using the following privacy webform.
            </p>

            <h2 id="privacy-policy-changes">6. Changes to the Privacy Policy</h2>
            <p>
              Our commitment to be the leading provider of innovative insulin delivery
              systems means that our business will continue to evolve as we introduce new
              services and features. Because of this, from time to time, our policies
              will be reviewed and may be revised. We reserve the right to change this
              Privacy Policy at any time by posting an updated version of the Privacy
              Policy on our website, and if necessary, notify you of such update. You
              will be able to see when we last updated the privacy notice by verifying
              the revision date. Please review this Privacy Policy from time to time to
              check whether we have made any changes to the way in which we process your
              personal data. Changes and additions to this Privacy Policy are effective
              from the date on which they are posted. Where we are required to do so, we
              will collect new consents from you.
            </p>

            <h2 id="contact-us">7. How to contact us</h2>
            <p>Please use the following contact details to contact us with any questions or comments you may have.</p>

            <h3>Privacy Operations Office and Data Protection Officer</h3>
            <p>
              Please contact our Privacy Operations Office if you have any questions on
              how we process your personal data using the following privacy webform or at{' '}
              <a href="mailto:dataprivacy@insulet.com">dataprivacy@insulet.com</a>. UK
              and EU residents may also contact directly our Data Protection Officer at{' '}
              <a href="mailto:dpo@insulet.com">dpo@insulet.com</a> in case of specific
              questions concerning data protection rights.
            </p>

            <h3>Contact details Insulet entities</h3>
            <p>To access the contact details of the Insulet entities please click here.</p>

            <h3>Omnipod Customer Care team</h3>
            <p>
              Please contact the Omnipod Customer Care team if you have any questions on
              our products or services via our contact form Insulet Customer Care or call
              us at 0800 011 6132 or +44 20 3887 1709 if calling from abroad.*
            </p>
            <p>
              *Your call be monitored and recorded for quality monitoring purposes. Calls
              to 0800 numbers are free from local landlines, but other networks may
              charge for these calls.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
