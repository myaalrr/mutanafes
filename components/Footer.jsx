/*my-website > components > Footer.jsx */

export default function Footer() {
  return (
    <>
      <footer
        style={{
          backgroundColor: '#0D2C54',
          paddingTop: '40px',
          paddingBottom: '40px',
          paddingLeft: '30px',
          paddingRight: '30px',
          width: '100vw',
          boxSizing: 'border-box',
          fontFamily: 'Urbanist-Light, sans-serif',
          color: '#fff',
          direction: 'ltr',
          textAlign: 'left',
          overflowX: 'hidden',
          margin: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '80px',
            justifyContent: 'flex-start',
            margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          {/* SOCIALS */}
          <div>
            <h4 style={{ color: '#979797ff', marginBottom: '10px', fontSize: '14px' }}>SOCIALS</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '14px' }}>
              <li><a href="https://www.instagram.com/Mutanafes/" target="_blank" rel="noopener noreferrer" className="footer-link">INSTAGRAM</a></li>
              <li><a href="https://www.linkedin.com/company/mutanafes/" target="_blank" rel="noopener noreferrer" className="footer-link">LINKEDIN</a></li>
              <li><a href="https://x.com/Mutanafes" target="_blank" rel="noopener noreferrer" className="footer-link">X.COM</a></li>
              <li><a href="https://youtube.com/@mutanafes?si=F7HfEcwcYU9C5Ebs" target="_blank" rel="noopener noreferrer" className="footer-link">YOUTUBE</a></li>
              <li><a href="https://www.facebook.com/people/Mutanafes-Company/pfbid0FVfFWr8Ah5aYapfCjcZ6NdiazN9491JXy2G7yEFC7EDKS3WhCjhe2uvUFfnzuPYwl/" target="_blank" rel="noopener noreferrer" className="footer-link">FACEBOOK</a></li>
              <li><a href="https://api.whatsapp.com/send?phone=966570779695" target="_blank" rel="noopener noreferrer" className="footer-link">WHATSAPP</a></li>
            </ul>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 style={{ color: '#979797ff', marginBottom: '10px', fontSize: '14px' }}>NAVIGATION</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '14px' }}>
              <li><a href="#hero" className="footer-link">HOME</a></li>
              <li><a href="#services" className="footer-link">SERVICES</a></li>
              <li><a href="#about" className="footer-link">ABOUT</a></li>
              <li><a href="#contact" className="footer-link">CONTACT</a></li>
            </ul>
          </div>
        </div>

        {/* الجملة في الأسفل */}
        <div style={{ marginTop: '30px', textAlign: 'right', fontSize: '14px', color: '#ffffffff',fontFamily: 'IBMPlexArabic' }}>
          © 2025 متنافس. جميع الحقوق محفوظة
        </div>
      </footer>

      <style jsx>{`
        .footer-link {
          color: #fff;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
