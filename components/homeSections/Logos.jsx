/*my-website > components > homeSection > Logos.jsx */
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';


export default function FullWidthLogos() {
  const logos = [
    { src: '/المجمعةة.png', alt: 'Majmaah', type: 'majmaah' },
    { src: '/متنافس.png', alt: 'Mutanafes', type: 'mutanafes' },
  ];

  const [repeatCount, setRepeatCount] = useState(6);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateRepeatCount() {
      const screenWidth = window.innerWidth;

      if (screenWidth < 600) {
        setRepeatCount(5);
      } else {
        const estimatedLogoWidth = screenWidth * 0.07;
        const count = Math.ceil(screenWidth / estimatedLogoWidth) + 2;
        setRepeatCount(count);
      }
    }

    updateRepeatCount();
    window.addEventListener('resize', updateRepeatCount);
    return () => window.removeEventListener('resize', updateRepeatCount);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const alternatingLogos = Array.from({ length: repeatCount }, (_, i) => logos[i % 2]);

  return (
    <section className="section-wrapper" ref={containerRef}>
      <div className={`logos-container ${isVisible ? 'visible' : ''}`}>
        {alternatingLogos.map((logo, idx) => (
          <div key={idx} className={`logo-item ${logo.type}`}>
            <Image
              src={logo.src}
              alt={logo.alt}
              layout="responsive"
              width={100}
              height={100}
              objectFit="contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .section-wrapper {
          position: relative;
          background: white;
          padding: 5rem 0;
          min-height: 40vh;
          max-height: 30vh;
          overflow: hidden;

          display: flex;
          align-items: center;       /* محاذاة رأسية بالوسط */
          justify-content: center;   /* محاذاة أفقية بالوسط */
        }

        .logos-container {
          display: flex;
          align-items: center;
          gap: 6vw;
          width: max-content;
          /* حذفت margin: 0 auto; لأننا نستخدم flex */
          flex-wrap: nowrap;
          padding: 1.5rem 0;
          position: relative;
          z-index: 2;

          opacity: 0;
          transition: opacity 1.5s ease;
        }

        .logos-container.visible {
          opacity: 1;
        }

        .logo-item {
          flex-shrink: 0;
          width: 15vw;
        }

        .logo-item.majmaah {
          width: 21vw;
        }

        .logo-item.mutanafes {
          width: 15vw;
        }

        @media (min-width: 600px) {
          .logos-container {
            gap: 3vw;
          }

          .logo-item {
            width: 7vw;
          }

          .logo-item.majmaah {
            width: 8vw;
          }

          .logo-item.mutanafes {
            width: 6vw;
          }
        }

        .section-wrapper::before,
        .section-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          width: 25vw;
          height: 100%;
          z-index: 3;
          pointer-events: none;
        }

        .section-wrapper::before {
          left: 0;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.8) 20%, transparent 100%);
        }

        .section-wrapper::after {
          right: 0;
          background: linear-gradient(to left, rgba(255, 255, 255, 0.8) 20%, transparent 100%);
        }
      `}</style>
    </section>
  );
}
