export default function Hero() {
  return (
    <section className="hero-section">
      {/* نسخة اللابتوب */}
      <div className="hero-text desktop">
        <p className="hero-title">
          <span className="underline-text">
            مرحبًا بك في <span className="highlight">متنافس</span>
          </span>{" "}
          وجهتك الأولى للاستعداد المهني
        </p>
      </div>

      {/* نسخة الجوال */}
      <div className="hero-text mobile">
        <p className="hero-title-mobile">
          <span className="underline-text-mobile">
            مرحبًا بك في <span className="highlight">متنافس</span>
          </span>{" "}
          وجهتك الأولى للاستعداد المهني
        </p>
      </div>

      <style jsx>{`
        .hero-section {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 700px;
          background-image: url('/p.jpg');
          background-size: cover;
          background-position: center;
          text-align: center;
          color: white;
          direction: rtl;
          font-family: 'Noto Sans Arabic Light';
          padding: 0 20px;
        }

        .hero-text {
          max-width: 100%;
        }

        .hero-title {
          font-size: 24px;
          font-family: 'Noto Sans Arabic Light';
          position: relative;
          line-height: 1.8;
        }

        .highlight {
          color: #ffffff;
          font-family: 'Noto Sans Arabic SemiBold';
        }

        .underline-text {
          display: inline-block;
          position: relative;
        }

        .underline-text::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: -6px;
          height: 4px;
          width: 100%;
          background-color: #e46a00;
          border-radius: 2px;
        }

        /* نسخة الجوال */
        .hero-title-mobile {
          font-size: 18px;
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .underline-text-mobile {
          display: inline-block;
          position: relative;
        }

        .underline-text-mobile::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: -4px;
          height: 2px;
          width: 100%;
          background-color: #e46a00;
          border-radius: 2px;
        }

        /* إظهار وإخفاء */
        .mobile {
          display: none;
        }

        @media (max-width: 640px) {
          .desktop {
            display: none;
          }

          .mobile {
            display: block;
          }

          .hero-section {
            height: 500px;
            background-position: top;
            padding: 0 16px;
          }

          .hero-text {
            max-width: 95%;
          }

          .hero-title-mobile {
            font-size: 16px;
            font-family: 'Noto Sans Arabic Light';
          }
        }
      `}</style>
    </section>
  );
}


