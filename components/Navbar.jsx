/*my-website > components > Navbar.jsx */
export default function Navbar({ closeMenu }) {
  return (
    <>
      <div className="side-menu" onClick={(e) => {
        if (e.target.classList.contains('side-menu')) {
          closeMenu();
        }
      }}>
        <a href="#hero" className="menu-link" onClick={closeMenu}>الرئيسية</a>
        <a href="#about" className="menu-link" onClick={closeMenu}>عن متنافس</a>
        <a href="#services" className="menu-link" onClick={closeMenu}>اطلب خدمة</a>
        <a href="#contact" className="menu-link" onClick={closeMenu}>تواصل معنا</a>
      </div>

      <style jsx>{`
        .side-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9998;
          animation: fadeSlideIn 0.4s forwards;
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-link {
          padding: 1rem 2.5rem; /* بدل 15px 40px */
          margin: 0.6rem 0;    /* بدل 10px */
          font-size: clamp(1rem, 2vw, 1.25rem); /* حجم نص مرن بين 16px و 20px */
          font-family: 'IBMPlexArabic', sans-serif;
          cursor: pointer;
          text-decoration: none;
          color: #000;
          transition: transform 0.3s ease;
        }

        .menu-link:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
