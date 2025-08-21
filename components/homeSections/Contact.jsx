/*my-website > components > homeSection > Contact.jsx */
import { motion } from "framer-motion";
export default function Contact() {
  return (
  <section
  id="contact"
  className="contact-section"
  style={{
    scrollMarginTop: '5vh',
    padding: 'clamp(2vh, 3vh, 5vh) clamp(3vw, 2vw, 5vw)', // padding مرن (عمودي + أفقي)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '12vh',
    position: 'relative',
    minHeight: 'clamp(40vh, 50vh, 60vh)', // ارتفاع مرن بين 40vh و 60vh
  }}
>

      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, y: '5vh', scale: 0.7 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'sticky',
          top: '15%',
          fontSize: 'clamp(14px, 4vw, 24px)', // مرن كما كان
          fontFamily: 'NotoSansArabicCondensedExtraLight',
          color: '#C49E7D',
          textAlign: 'right',
          marginRight: '3%',
          marginTop: 0,
          zIndex: 10,
          width: '100%',
        }}
      >
        تواصل معنا
      </motion.h2>

      {/* المحتوى */}
 <div
  style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    flexGrow: 1,            // هذا يخلي المحتوى ياخذ كل المساحة المتاحة
    justifyContent: 'center', // يتمركز عمودياً داخل السكشن
    marginTop: 0,           // نلغي المارجن العلوي عشان التمركز يكون مضبوط
  }}
>

        {/* رابط الموقع */}
        <motion.a
          href="https://maps.app.goo.gl/6d6GgxcXn7ZG41Wy9"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }} // تكبير فقط
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            color: 'black',
            fontSize: 'clamp(12px, 2.5vw, 18px)',
            textDecoration: 'underline',
            marginBottom: '3vh',
            lineHeight: 1.8,
            fontFamily: 'IBMPlexArabic',
            display: 'block',
          }}
        >
          كلية إدارة الأعمال بجامعة المجمعة · VC69+P8M, Academic City, Al Majma'ah 15341, Saudi Arabia
        </motion.a>

        {/* الإيميل */}
        <motion.a
          href="mailto:MUTANAFES@GMAIL.COM"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.05, backgroundColor: "#222" }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            display: 'inline-block',
            padding: '0 2vw',
            background: 'black',
            color: 'white',
            marginBottom: '1.2vh',
            fontSize: 'clamp(10px, 2vw, 16px)',
            fontFamily: 'Urbanist-Light',
          }}
        >
          MUTANAFES@GMAIL.COM
        </motion.a>

        {/* الرقم */}
        <motion.a
          href="tel:+966570779695"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.05, backgroundColor: "#222" }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            display: 'inline-block',
            padding: '0 2vw',
            background: 'black',
            color: 'white',
            fontSize: 'clamp(10px, 2vw, 16px)',
            fontFamily: 'Urbanist-Light',
          }}
        >
         9695 077 57 966+ 
        </motion.a>
      </div>

      <style jsx>{`
        a:hover {
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
}
