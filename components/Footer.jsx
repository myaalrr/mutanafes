import { FiFacebook } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
import { RiMapPinLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#163853',
        height: '60px',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        paddingLeft: '100px',
      }}
    >
      <div style={{ display: 'flex', gap: '40px' }}>
        <a href="https://www.facebook.com/people/Mutanafes-Company/pfbid02KX1rzciLoyqN91WeGUMmrGbm3CNmC3N6rbkCmdMfgfEbK8NSAG3VD57HDD3bCCRDl/" target="_blank" rel="noopener noreferrer">
          <FiFacebook style={{ color: '#fff', fontSize: '20px' }} />
        </a>
        <a href="https://x.com/Mutanafes" target="_blank" rel="noopener noreferrer">
          <RiTwitterXFill style={{ color: '#fff', fontSize: '20px' }} />
        </a>
        <a href="https://www.instagram.com/mutanafes/" target="_blank" rel="noopener noreferrer">
          <FaInstagram style={{ color: '#fff', fontSize: '20px' }} />
        </a>
        <a href="https://www.youtube.com/@Mutanafes" target="_blank" rel="noopener noreferrer">
          <RiYoutubeLine style={{ color: '#fff', fontSize: '20px' }} />
        </a>
        <a href="https://www.linkedin.com/company/mutanafes" target="_blank" rel="noopener noreferrer">
          <TbBrandLinkedin style={{ color: '#fff', fontSize: '20px' }} />
        </a>
        <a href="https://maps.app.goo.gl/j6oUs5cPTibQkLdc8" target="_blank" rel="noopener noreferrer">
          <RiMapPinLine style={{ color: '#fff', fontSize: '20px' }} />
        </a>
      </div>

      <div
        style={{
          color: '#fff',
          fontFamily: "'Noto Sans Arabic SemiBold', sans-serif",
          fontSize: '14px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        © 2025 متنافس. جميع الحقوق محفوظة
      </div>

      <div style={{ width: '120px' }}></div>
    </footer>
  );
}



