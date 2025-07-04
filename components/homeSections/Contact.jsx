import { PiPhoneCallThin, PiEnvelopeSimpleThin, PiChatCircleDotsThin } from "react-icons/pi";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        scrollMarginTop: '100px',
        height: '400px',
        paddingLeft: '90px',
        paddingRight: '90px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '120px',
      }}
    >
      <h2
        className="custom-arabic-semibold text-[#000000]"
        style={{ fontSize: '30px', textAlign: 'center' }}
      >
        تواصل معنا
      </h2>

      <div
        style={{
          marginTop: '30px',
          width: '100%',
          maxWidth: '290px',
          direction: 'ltr',
          textAlign: 'right',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '30px',
          }}
        >
          <PiPhoneCallThin style={{ fontSize: '24px', color: '#E46A00', flexShrink: 0 }} />
          <div
            style={{
              fontFamily: "'Urbanist-Light', sans-serif",
              fontSize: '18px',
              color: '#333',
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: '5px',
            }}
          >
            <a href="tel:+966570779695" style={{ textDecoration: 'none', color: '#333' }}>
              +966 570779695
            </a>
            <span style={{ fontWeight: 'bold' }}>،</span>
            <a href="tel:+966568330051" style={{ textDecoration: 'none', color: '#333' }}>
              +966 568330051
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '30px',
          }}
        >
          <PiEnvelopeSimpleThin style={{ fontSize: '24px', color: '#E46A00', flexShrink: 0 }} />
          <a
            href="mailto:Mutanafes.hr@gmail.com"
            style={{
              fontFamily: "'Urbanist-Light', sans-serif",
              fontSize: '18px',
              color: '#333',
              textDecoration: 'none',
            }}
          >
            Mutanafes.hr@gmail.com
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <PiChatCircleDotsThin style={{ fontSize: '24px', color: '#E46A00', flexShrink: 0 }} />
          <div
            style={{
              fontFamily: "'Urbanist-Light', sans-serif",
              fontSize: '18px',
              color: '#333',
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: '5px',
            }}
          >
            <a href="https://wa.me/966570779695" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#333' }}>
              +966 570779695
            </a>
            <span style={{ fontWeight: 'bold' }}>،</span>
            <a href="https://wa.me/966568330051" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#333' }}>
              +966 568330051
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

