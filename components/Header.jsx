import Image from 'next/image';
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Header() {
  return (
    <>
      <header
        style={{
          position: 'fixed',
          width: '100%',
          height: '80px',
          backgroundColor: '#FFF',
          direction: 'rtl',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          transition: 'height 0.3s ease',
        }}
        className="header-main"
      >
        <div
          style={{
            maxWidth: '1280px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            padding: '0 40px',
            boxSizing: 'border-box',
            fontSize: '15px',
            color: '#000',
            transition: 'padding 0.3s ease',
          }}
          className="header-container"
        >
          {/* الشعار */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-wrapper" style={{ position: 'relative', width: 50, height: 50 }}>
              <Image
                src="/df475dc1-e743-4e76-9407-d8abeca1055e.png.png"
                alt="Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="logo-text-wrapper" style={{ position: 'relative', width: 100, height: 30 }}>
              <Image
                src="/d8e70213-98ea-49e6-a02c-4cfd2367f008.png.png"
                alt="Logo Text"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* معلومات التواصل */}
          <div
            className="contact-info"
            style={{
              display: 'flex',
              gap: '30px',
              alignItems: 'center',
              direction: 'ltr',
              textAlign: 'left',
              justifyContent: 'flex-end',
              fontSize: '15px',
              transition: 'gap 0.3s ease, font-size 0.3s ease',
            }}
          >
            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A1A1A1' }}>
              <LuPhone className="icon" color="#000" />
              <a href="tel:+966570779695" style={{ color: '#111', textDecoration: 'none' }}>
                +966 570 779 695
              </a>
            </div>

            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A1A1A1' }}>
              <MdOutlineMailOutline className="icon" color="#000" />
              <a href="mailto:Mutanafes.hr@gmail.com" style={{ color: '#111', textDecoration: 'none' }}>
                Mutanafes.hr@gmail.com
              </a>
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
        .icon {
          font-size: 20px;
        }

        @media (max-width: 480px) {
          header.header-main {
            height: 50px !important;
          }

          div.header-container {
            padding: 0 20px !important;
          }

          .logo-wrapper {
            width: 25px !important;
          }

          .logo-text-wrapper {
            width: 65px !important;
          }

          .contact-info {
            gap: 10px !important;
            font-size: 8px !important;
          }

          .icon {
            font-size: 12px !important;
          }
        }
      `}</style>
    </>
  );
}

