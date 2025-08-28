// components/homeSections/Hero.jsx
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const logged = typeof window !== "undefined" ? localStorage.getItem("logged_in") : null;
      const name   = typeof window !== "undefined" ? localStorage.getItem("user_name")  : "";
      const admin  = typeof window !== "undefined" ? localStorage.getItem("is_admin")   : "0";

      setIsLoggedIn(logged === "1");
      setUserName(name || "");
      setIsAdmin(admin === "1");
    } catch {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("logged_in");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_name");
      localStorage.removeItem("is_admin");
    } catch {}
    router.replace("/");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, ease: 'easeOut' } },
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1, transition: { duration: 2, ease: 'easeOut' } },
  };

  const flashVariants = {
    hidden: { textShadow: '0 0 0 rgba(255,255,255,0)' },
    visible: { transition: { repeat: Infinity, repeatType: 'loop', duration: 2, ease: 'easeInOut', delay: 2 } },
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 1, ease: 'easeOut' } },
    hover:   { scale: 1.1, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const fullText = "وجهتك الأولى للاستعداد المهني";
  const [displayedLength, setDisplayedLength] = useState(0);
  const [blurValue, setBlurValue] = useState(5);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current > fullText.length) clearInterval(interval);
      else {
        setDisplayedLength(current);
        setBlurValue(5 - (5 * current) / fullText.length);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const [bgPosX, setBgPosX] = useState(0);
  useEffect(() => {
    let frame;
    const animate = () => {
      setBgPosX((prev) => (prev >= 100 ? 0 : prev + 0.3));
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.section initial="hidden" animate="visible" variants={containerVariants}
      style={{ position: 'relative', width: '100%', height: '100svh', minHeight: '400px' }}>
      <Image src="/17.jpg" alt="Hero Background" fill style={{ objectFit: 'cover', zIndex: 0 }} priority />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1 }} />

      <motion.div initial="hidden" animate="visible" variants={{ visible: { delayChildren: 0 } }}
        className="heroContent" style={{
          position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-start', alignItems: 'flex-start', paddingRight: '10%',
          paddingLeft: '10%', paddingTop: '40vh', zIndex: 2,
        }}>
        <motion.h1 variants={textVariants} className="heroTitle font-ibmB" style={{
          position: 'relative', fontSize: 'clamp(2rem, 3vw, 4rem)', userSelect: 'none',
          color: 'rgba(255, 255, 255, 0.85)', backgroundImage:
            `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('/17.jpg')`,
          backgroundSize: 'cover', backgroundPosition: `${bgPosX}% center`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          مرحباً بك في{' '}
          <motion.span variants={flashVariants} initial="hidden" animate="visible" className="heroFlash" style={{
            paddingTop: '0.2em', paddingBottom: '0.2em', opacity: 0.9,
            color: 'rgba(255, 255, 255, 0.85)', backgroundImage:
              `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('/17.jpg')`,
            backgroundSize: 'cover', backgroundPosition: `${bgPosX}% center`,
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            متنافس
          </motion.span>
        </motion.h1>

        <p className="heroSubtitle font-ibmB" style={{
          paddingTop: '0.2em', paddingBottom: '0.2em', direction: 'rtl', textAlign: 'right',
          whiteSpace: 'nowrap', overflow: 'hidden', width: `${(displayedLength / fullText.length) * 100}%`,
          transition: 'width 0.08s ease-out', filter: `blur(${blurValue}px)`, opacity: 0.3,
          transitionProperty: 'width, filter, opacity', transitionDuration: '0.08s',
          transitionTimingFunction: 'ease-out', color: '#fff', marginTop: '10px',
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {fullText}
        </p>

        <motion.div initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          style={{ marginTop: '20vh', display: 'flex', gap: '10px', justifyContent: 'center', width: '100%' }}>
          {isLoggedIn === null ? null : (
            <>
              {isLoggedIn ? (
                isAdmin ? (
                  <>
                    <motion.button variants={buttonVariants} whileHover="hover"
                      onClick={() => router.push("/admin/review")}
                      style={{
                        backgroundColor: '#C49E7D', color: 'white', border: 'none', borderRadius: '50px',
                        padding: '12px 30px', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                        cursor: 'pointer', fontFamily: 'IBMPlexArabic',
                      }}>
                      الطلبات
                    </motion.button>
                    <motion.button variants={buttonVariants} whileHover="hover" onClick={handleLogout}
                      style={{
                        backgroundColor: "transparent", color: "#ffffff",
                        border: "clamp(1px, 0.4vw, 2px) solid #C49E7D", borderRadius: "50px",
                        padding: "12px 30px", fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
                        cursor: "pointer", fontFamily: "IBMPlexArabic",
                      }}>
                      تسجيل الخروج
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button variants={buttonVariants} whileHover="hover"
                      onClick={() => router.push("/my-services")}
                      style={{
                        backgroundColor: '#C49E7D', color: 'white', border: 'none', borderRadius: '50px',
                        padding: '12px 30px', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                        cursor: 'pointer', fontFamily: 'IBMPlexArabic',
                      }}>
                      خدماتي
                    </motion.button>
                    <motion.button variants={buttonVariants} whileHover="hover" onClick={handleLogout}
                      style={{
                        backgroundColor: "transparent", color: "#ffffff",
                        border: "clamp(1px, 0.4vw, 2px) solid #C49E7D", borderRadius: "50px",
                        padding: "12px 30px", fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
                        cursor: "pointer", fontFamily: "IBMPlexArabic",
                      }}>
                      تسجيل خروج
                    </motion.button>
                  </>
                )
              ) : (
                <>
                  <motion.button variants={buttonVariants} whileHover="hover" onClick={() => router.push("/login")}
                    style={{
                      backgroundColor: '#C49E7D', color: 'white', border: 'none', borderRadius: '50px',
                      padding: '12px 30px', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                      cursor: 'pointer', fontFamily: 'IBMPlexArabic',
                    }}>
                    تسجيل الدخول
                  </motion.button>
                  <motion.button variants={buttonVariants} whileHover="hover" onClick={() => router.push("/signup")}
                    style={{
                      backgroundColor: "transparent", color: "#ffffff",
                      border: "clamp(1px, 0.4vw, 2px) solid #C49E7D", borderRadius: "50px",
                      padding: "12px 30px", fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
                      cursor: "pointer", fontFamily: "IBMPlexArabic",
                    }}>
                    إنشاء حساب
                  </motion.button>
                </>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
