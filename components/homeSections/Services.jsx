import {
  PiCameraThin,
  PiReadCvLogoThin,
  PiLinkedinLogoThin,
  PiHandshakeThin,
  PiBriefcaseThin,
  PiUsersThreeThin,
} from "react-icons/pi";

export default function Services() {
  const services = [
    {
      label: "تصوير احترافي",
      description: "جلسات تصوير لتحسين الصور الشخصية على المنصات الإجتماعية",
      Icon: PiCameraThin,
      link: "/services/photography", // رابط خاص بالخدمة
    },
    {
      label: " LinkedIn تحسين حسابات ",
      description: "إنشاء حسابات مهنية جذابة ومراجعة الحسابات الشخصية",
      Icon: PiLinkedinLogoThin,
      link: "/services/linkedin",
    },
    {
      label: "إعداد السيرة الذاتية",
      description: "كتابة سيرة ذاتية احترافية تتناسب مع معايير الشركات",
      Icon: PiReadCvLogoThin,
      link: "/services/cv-preparation",
    },
    {
      label: "شراكات مع منصات التوظيف",
      description: "التعاون مع منصات توظيف لتسهيل الوصول إلى فرص العمل",
      Icon: PiHandshakeThin,
      link: "/services/partnerships",
    },
    {
      label: "التدريب على المقابلات الوظيفية",
      description: "مقابلات تجريبية وتقييم الأداء لتطوير الثقة",
      Icon: PiBriefcaseThin,
      link: "/services/interview-training",
    },
    {
      label: "فرص التدريب التعاوني",
      description: "توفير فرص تدريب",
      Icon: PiUsersThreeThin,
      link: "/services/internships",
    },
  ];

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">خدماتنا</h2>

      <div className="services-container">
        {services.map(({ label, Icon, description, link }, i) => (
          <div className="service-box" key={i}>
            <div className="icon-wrapper">
              <div className="circle-bg" />
              <Icon className="service-icon" />
            </div>
            <a href={link} className="service-label">
              {label}
            </a>
            <p className="service-description">{description}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .services-section {
          text-align: center;
          scroll-margin-top: 100px;
          height: auto;
          position: relative;
        }

        .services-title {
          font-size: 30px;
          margin-bottom: 100px;
          color: #e46a00;
          font-family: 'Noto Sans Arabic SemiBold', sans-serif;
        }

        .services-container {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
        }

        .service-box {
          text-align: center;
          width: 30%;
          min-width: 200px;
        }

        .icon-wrapper {
          position: relative;
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }

        .circle-bg {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background-color: #d1d1d1;
          position: absolute;
          top: 3px;
          left: 20px;
          z-index: 0;
          transform: rotate(15deg);
        }

        .service-icon {
          font-size: 30px;
          color: #000000;
          position: relative;
          z-index: 1;
        }

        .service-label {
          font-size: 15px;
          color: #000000;
          display: inline-block;
          font-family: 'Noto Sans Arabic SemiBold', sans-serif;
          text-decoration: none;
          cursor: pointer;
        }

        .service-description {
          font-size: 15px;
          color: #666;
          font-family: 'Noto Sans Arabic Light';
          margin-top: 0px;
          line-height: 1.4;
          max-width: 180px;
          margin-inline: auto;
        }

        @media (max-width: 480px) {
          .services-section {
            height: auto;
            padding-bottom: auto;
          }

          .services-title {
            margin-bottom: 100px;
            font-size: 25px;
          }

          .services-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* كل صف فيه خدمتين */
            gap: 30px 10px;
            justify-items: center;
          }

          .service-box {
            width: 100%;
            max-width: 160px;
            text-align: center;
          }

          .icon-wrapper {
            width: 35px;
            height: 35px;
          }

          .circle-bg {
            width: 15px;
            height: 15px;
            left: 12px;
          }

          .service-icon {
            font-size: 20px;
          }

          .service-label {
            font-size: 10px;
          }

          .service-description {
            font-size: 10px;
            line-height: 1.8;
            max-width: 120px;
          }
        }
      `}</style>
    </section>
  );
}


