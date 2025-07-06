export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-heading">عن متنافس</h2>

        <p className="about-sub">About Mutanafes</p>

        <p className="about-text">
          <span style={{ color: '#E46A00',fontFamily: "Noto Sans Arabic SemiBold", }}>متنافس </span>
          هي منصة تأهيل مهني متكاملة تهدف إلى تمكين الطلاب والخريجين للاستعداد لسوق العمل عبر مجموعة من الخدمات المتكاملة التي تهدف إلى تعزيز مهاراتهم وتسريع وصولهم إلى الفرص الوظيفية.
          <br /><br /> تأسست متنافس عام 2024 في حاضنة الأعمال بجامعة المجمعة، وتسعى إلى أن تكون المنصة الرائدة في تأهيل الكوارد الشابة وربطها بفرص العمل المناسبة.
          <br /><br /><br />

          <span style={{ color: '#000000', fontFamily: "Noto Sans Arabic SemiBold" }}>رؤيتنا :</span><br />
          أن نكون الجسر الذي يربط الخريجين بسوق العمل عبر تدريب عملي متكامل.
          <br /><br />

          <span style={{ color: '#000000', fontFamily: "Noto Sans Arabic SemiBold" }}>رسالتنا :</span><br />
          تقديم برامج تأهيلية حديثة تعتمد على التكنلوجيا والتفاعل المباشر، لدعم جاهزية الخريجين.
          <br /><br />

          <span style={{ color: '#000000', fontFamily: "Noto Sans Arabic SemiBold" }}>لماذا متنافس ؟</span><br />
          نستخدم أحدث التقنيات لتقديم تدريب عملي وفعال.<br />
          نقدم فرص تأهيل وشهادات احترافية تعزز التوظيف.<br />
          لدينا شراكات مع كبرى الجهات التوظيفية لضمان جاهزية الخريجين.<br />
        </p>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          max-width: 100%;
          scroll-margin-top: 180px;
          padding: 0 40px;
          box-sizing: border-box;
          height: 800px;
        }

        .about-container {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          text-align: right;
        }

        .about-heading {
          font-size: 30px;
          direction: rtl;
          margin-top: 100px;
          margin-bottom: -30px;
          font-family: 'Noto Sans Arabic SemiBold', sans-serif;
          color: #000;
        }

        .about-sub {
          font-size: 20px;
          direction: ltr;
          margin-bottom: 100px;
          transform: translateX(-50px);
          font-family: 'Urbanist-SemiBold', sans-serif;
          color: #000;
        }

        .about-text {
          font-size: 18px;
          direction: rtl;
          line-height: 1.8;
          text-align: right;
          color: #000;
          font-family: 'Noto Sans Arabic Light', sans-serif;
        }

        /* ✅ نسخة الجوال */
        @media (max-width: 450px) {
          .about-section {
            height: auto;
          margin-bottom: 50px;

          }

          .about-heading {
            font-size: 25px;
          }

          .about-sub {
            font-size: 17px;
            transform: translateX(-40px);
            margin-bottom: 50px;
          }

          .about-text {
            font-size: 14px;
            line-height: 1.8;
             max-width: 330px;


          }
        }
      `}</style>
    </section>
  );
}





