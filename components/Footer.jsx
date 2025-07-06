import { FiFacebook } from "react-icons/fi";
import { RiTwitterXFill, RiYoutubeLine, RiMapPinLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { TbBrandLinkedin } from "react-icons/tb";

export default function Footer() {
  return (
    <>
      <footer
        style={{
          backgroundColor: '#163853',
          padding: '10px 20px',
          overflowX: 'hidden', // منع التمرير الأفقي
          boxSizing: 'border-box',
        }}
      >
        <div
          className="footer-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: '10px',
          }}
        >
          {/* أيقونات التواصل */}
          <div
            className="footer-icons"
            style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <a href="https://www.facebook.com/people/Mutanafes-Company/pfbid02KX1rzciLoyqN91WeGUMmrGbm3CNmC3N6rbkCmdMfgfEbK8NSAG3VD57HDD3bCCRDl/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FiFacebook className="footer-icon" color="#ffffff" />
            </a>
            <a href="https://x.com/Mutanafes" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <RiTwitterXFill className="footer-icon" color="#ffffff" />
            </a>
            <a href="https://www.instagram.com/mutanafes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="footer-icon" color="#ffffff" />
            </a>
            <a href="https://www.youtube.com/@Mutanafes" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <RiYoutubeLine className="footer-icon" color="#ffffff" />
            </a>
            <a href="https://www.linkedin.com/company/mutanafes" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <TbBrandLinkedin className="footer-icon" color="#ffffff" />
            </a>
            <a href="https://maps.app.goo.gl/j6oUs5cPTibQkLdc8" target="_blank" rel="noopener noreferrer" aria-label="Location">
              <RiMapPinLine className="footer-icon" color="#ffffff" />
            </a>
          </div>

          {/* النص */}
          <div
            className="footer-text"
            style={{
              color: '#fff',
              fontFamily: "'Noto Sans Arabic SemiBold', sans-serif",
              fontSize: '14px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            © 2025 متنافس. جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer-icon {
          font-size: 20px;
          transition: font-size 0.3s ease;
        }

        @media (max-width: 480px) {
          .footer-container {
            flex-direction: row !important;
            justify-content: center !important;
            flex-wrap: nowrap !important;
            gap: 10px;
          }

          .footer-icons {
            flex-wrap: nowrap !important;
            flex: 1;
            justify-content: center;
          }

          .footer-icon {
            font-size: 12px !important;
          }

          .footer-text {
            font-size: 10px !important;
          }
        }
      `}</style>
    </>
  );
}


