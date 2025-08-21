/*my-website > components > Header.jsx */
import Image from 'next/image';
import { CiMenuBurger } from "react-icons/ci";
import { useState } from 'react';
import Navbar from './Navbar';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header-main">
        <div className="header-container">
          <div className="logo">
            <div className="logo-wrapper">
              <Image src="/logo.png" fill style={{ objectFit: 'contain' }} alt="Logo" />
            </div>
            <div className="logo-text-wrapper">
              <Image src="/logoText.png" fill style={{ objectFit: 'contain' }} alt="Logo Text" />
            </div>
          </div>

          <div
            className="menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="فتح القائمة"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setMenuOpen(!menuOpen); }}
          >
            <CiMenuBurger />
          </div>
        </div>
      </header>

      {menuOpen && <Navbar closeMenu={() => setMenuOpen(false)} />}

      <style jsx>{`
        .header-main {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 80px;
          background-color: #FFF;
          direction: rtl;
          z-index: 9999;
          display: flex;
          justify-content: center;
          overflow-x: hidden;
          font-family: 'IBMPlexArabic', sans-serif;
          box-sizing: border-box;
          padding: 0 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .header-container {
          max-width: 1280px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .logo-text-wrapper {
          position: relative;
          width: 120px;
          height: 50px;
        }

        .menu-icon {
          font-size: 28px;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .header-main {
            height: 60px;
            padding: 0 10px;
          }
          .header-container {
            padding: 0;
          }
          .logo-wrapper {
            width: 30px;
            height: 30px;
          }
          .logo-text-wrapper {
            width: 80px;
            height: 35px;
          }
          .menu-icon {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
