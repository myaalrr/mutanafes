import Image from 'next/image';

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

          {/* روابط */}
          <div
            className="contact-info"
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              direction: 'rtl',
              textAlign: 'right',
              fontSize: '15 px',
            }}
          >
            <a
              href="/login"
              className="login-btn"
              style={{
                fontFamily: "Noto Sans Arabic Light",
              }}
            >
              تسجيل الدخول
            </a>

            <a
              href="/signup"
              className="signup-btn"
              style={{
                fontFamily: "Noto Sans Arabic Light",
              }}
            >
              إنشاء حساب
            </a>
          </div>
        </div>
      </header>

      <style jsx>{`
        .login-btn {
          background-color: #000;
          color: #fff;
          padding: 6px 25px;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.3s ease;
          font-size: 15px;
          display: inline-block;
        }

        .login-btn:hover {
          background-color: #333;
        }

        .signup-btn {
          border: 2px solid #000;
          color: #000;
          padding: 4px 25px;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-size: 15px;
          display: inline-block;
        }

        .signup-btn:hover {
          background-color: #000;
          color: #fff;
        }

        @media (max-width: 480px) {
          header.header-main {
            height: 60px !important;
          }

          div.header-container {
            padding: 0 20px !important;
          }

          .logo-wrapper {
            width: 30px !important;
          }

          .logo-text-wrapper {
            width: 80px !important;
          }

          .contact-info {
            gap: 10px !important;
          }

          .login-btn,
          .signup-btn {
            font-size: 12px !important;
            padding: 0px 12px !important;
          }
        }
      `}</style>
    </>
  );
}

