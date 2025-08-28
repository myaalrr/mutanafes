/*my-website > components > homeSection > Services.jsx */
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    { label: "تصوير احترافي", description: "جلسات تصوير لتحسين الصور الشخصية على المنصات الإجتماعية", image: "/icons/كاميرا.gif" },
    { label: "تحسين حسابات LinkedIn", description: "إنشاء حسابات مهنية جذابة ومراجعة الحسابات الشخصية", image: "/icons/لينكدإن.gif" },
    { label: "إعداد السيرة الذاتية", description: "كتابة سيرة ذاتية احترافية تتناسب مع معايير الشركات", image: "/icons/سيرة.gif" },
    { label: "شراكات مع منصات التوظيف", description: "التعاون مع منصات توظيف لتسهيل الوصول إلى فرص العمل", image: "/icons/شراكات.gif" },
    { label: "التدريب على المقابلات الوظيفية", description: "مقابلات تجريبية وتقييم الأداء لتطوير الثقة", image: "/icons/عمل.gif" },
    { label: "فرص التدريب التعاوني", description: "توفير فرص تدريب", image: "/icons/تدريب.gif" },
  ];

  return (
    <section id="services" className="services-section">
      <motion.h2
        initial={{ opacity: 0, y: 50, scale: 0.7 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'sticky',
          top: '15%',
          fontSize: 'clamp(14px, 4vw, 24px)',
          fontFamily: 'NotoSansArabicCondensedExtraLight',
          color: '#C49E7D',
          textAlign: 'right',
          marginRight: '3%',
          marginTop: '1rem',
        }}
      >
        خدماتنا
      </motion.h2>

      <div className="services-container">
        {services.map(({ label, image, description }, i) => (
          <div className="service-box" key={i}>
            <div className="icon-wrapper">
              <img src={image} alt={label} className="service-image" />
            </div>
            <span className="service-label">{label}</span>
            <p className="service-description">{description}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .services-section {
          text-align: center;
          scroll-margin-top: 10vh;
          position: relative;
        }

        .services-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10vh 3vw;
          justify-items: center;
          max-width: 90vw;
          margin: 0 auto;
          padding: 2vh;
        }

        .service-box {
          position: relative;
          text-align: center;
          width: 100%;
          max-width: 30vw;
        }

        .service-box::before {
          content: "";
          position: absolute;
          top: 10%;
          left: 5%;
          width: 90%;
          height: 80%;
          background-color: #F5F5F5;
          border-radius: 40px;
          z-index: 0;
        }

        .icon-wrapper {
          position: relative;
          width: clamp(40px, 10vw, 100px);
          height: clamp(40px, 10vw, 100px);
          margin: 0 auto 1vh;
          z-index: 1;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .service-label, .service-description {
          position: relative;
          z-index: 1;
        }

        .service-label {
          font-size: clamp(12px, 2vw, 18px);
          color: #163853;
          display: inline-block;
          font-family: 'IBMPlexArabic-Bold', sans-serif;
          margin-top: 1vh;
        }

        .service-description {
          font-size: clamp(10px, 1.8vw, 16px);
          color: #666;
          font-family: 'IBMPlexArabic';
          margin-top: 0.5vh;
          line-height: 1.5;
          max-width: 80%;
          margin-inline: auto;
        }
      `}</style>
    </section>
  );
}
