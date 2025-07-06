import { PiPhoneCallThin, PiEnvelopeSimpleThin, PiChatCircleDotsThin } from "react-icons/pi";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        scrollMarginTop: '80px',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '120px',
      }}
    >
      <h2
        className="custom-arabic-semibold contact-title"
        style={{ fontSize: '30px', textAlign: 'center' }}
      >
        تواصل معنا
      </h2>

      <div className="contact-wrapper">
        {[
          {
            Icon: PiPhoneCallThin,
            content: (
              <>
                <a href="tel:+966570779695" className="contact-link">
                  <span dir="ltr">+966 570779695</span>
                </a>
                <span className="comma">،</span>
                <a href="tel:+966568330051" className="contact-link">
                  <span dir="ltr">+966 568330051</span>
                </a>
              </>
            ),
          },
          {
            Icon: PiEnvelopeSimpleThin,
            content: (
              <a href="mailto:Mutanafes.hr@gmail.com" className="contact-link">
                Mutanafes.hr@gmail.com
              </a>
            ),
          },
          {
            Icon: PiChatCircleDotsThin,
            content: (
              <>
                <a
                  href="https://wa.me/966570779695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span dir="ltr">+966 570779695</span>
                </a>
                <span className="comma">،</span>
                <a
                  href="https://wa.me/966568330051"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span dir="ltr">+966 568330051</span>
                </a>
              </>
            ),
          },
        ].map(({ Icon, content }, i) => (
          <div className="contact-item" key={i}>
            <Icon className="contact-icon" />
            <div className="contact-text">{content}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .contact-wrapper {
          margin-top: 40px;
          height: 'auto',
          direction: ltr;
          text-align: right;
        }

        .contact-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          justify-content: flex-start;
          direction: rtl;
        }

        .contact-icon {
          font-size: 25px;
          color: #E46A00;
          flex-shrink: 0;
        }

        .contact-text {
          font-family: 'Urbanist-Light', sans-serif;
          font-size: 15px;
          color: #000000;
          white-space: nowrap;
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .contact-link {
          color: #000000;
          text-decoration: none;
        }

        .comma {
          font-weight: bold;
          margin: 0 5px;
          color: #000000;
        }

        /* ✅ Media Query للجوال */
        @media (max-width: 480px) {
          .contact-title {
            font-size: 25px !important;
            color: #000000 !important;
          }

          .contact-icon {
            font-size: 12px !important;
          }

          .contact-text {
            font-size: 12px !important;
            align-items: flex-start;
             color: #000000 ;
          }

          .contact-link {
            font-size: 12px !important;
            color: #000000 !important;
          }

          
        }
      `}</style>
    </section>
  );
}
