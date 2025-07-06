'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'home', label: 'الرئيسية', href: '/', isLink: true, bold: true },
    { name: 'about', label: 'عن متنافس', href: '#about' },
    { name: 'services', label: 'خدماتنا', href: '#services' },
    { name: 'contact', label: 'تواصل معنا', href: '#contact' },
  ];

  const getLinkColor = (name) =>
    hovered === name ? '#E46A00' : scrolled ? '#000000' : '#ffffff';

  const baseClass =
    'no-underline transition-colors duration-300 hover:text-[#E46A00] active:text-[#B34F00]';

  return (
    <>
      <nav
        className="navbar-main"
        style={{
          position: 'fixed',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 40px',
          height: '200px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexDirection: 'row-reverse',
          }}
        >
          {links.map(({ name, label, href, isLink, bold }) => {
            const textClass = bold ? 'arabic-text-semiBold' : 'arabic-text-Light';
            const fullClass = `${textClass} ${baseClass}`;

            return isLink ? (
              <Link
                key={name}
                href={href}
                className={fullClass}
                style={{ color: getLinkColor(name) }}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered('')}
              >
                {label}
              </Link>
            ) : (
              <a
                key={name}
                href={href}
                className={fullClass}
                style={{ color: getLinkColor(name) }}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered('')}
              >
                {label}
              </a>
            );
          })}
        </div>
      </nav>

      <style jsx>{`
        @media (max-width: 480px) {
          nav.navbar-main {
            top: 70px !important; /* ارفعيه تحت الهيدر */
            height: 30px !important; /* خلي الارتفاع أقل للجوال */
            padding: 0 20px !important;
                        font-size: 13px !important;

          }

          nav.navbar-main div {
            gap: 10px !important;
          }

          nav.navbar-main a {
            font-size: 13px !important;
          }
        }
      `}</style>
    </>
  );
}



