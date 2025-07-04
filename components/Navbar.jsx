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
    <nav
      className="w-full px-5 max-w-[1280px] mx-auto text-sm text-black rtl flex flex-row-reverse justify-start items-center"
      style={{
        position: 'fixed',
        height: '200px',
        zIndex: 1000,
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
            style={{
              marginLeft: '20px',
              color: getLinkColor(name),
            }}
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
            style={{
              marginLeft: '20px',
              color: getLinkColor(name),
            }}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered('')}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}





