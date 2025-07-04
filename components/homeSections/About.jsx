export default function About() {
  return (
    <section
      id="about"
      style={{ position: 'relative', maxWidth: '100%', scrollMarginTop: '110px', marginTop: '400px' }}
    >
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-230px' }}>
        <h2
          className="custom-arabic-semibold text-[#000000]"
          style={{
            fontSize: '30px',
            direction: 'rtl',
            marginRight: '202px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          عن متنافـــس
        </h2>

        <p
          className="Urbanist-Light text-[#000000]"
          style={{
            fontSize: '26px',
            direction: 'ltr',
            marginLeft: '957px',
            top: '-30px',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
          }}
        >
          About Mutanafes
        </p>

        <p
          className="custom-arabic-light text-[#333]"
          style={{
            fontSize: '20px',
            direction: 'rtl',
            marginTop: '60px',
            transform: 'translateX(-150px)',
            marginRight: '90px',
            lineHeight: '1.8',
          }}
        >
          <span style={{ color: '#E46A00', fontWeight: 'bold' }}>متنافس </span>
          هي منصة تأهيل مهني متكاملة تهدف إلى تمكين الطلاب والخريجين للاستعداد لسوق العمل
          عبر مجموعة<br /> من الخدمات المتكاملة التي تهدف إلى تعزيز مهاراتهم وتسريع وصولهم إلى الفرص الوظيفية.<br /> تأسست متنافس عام 2024 في حاضنة الأعمال بجامعة المجمعة، وتسعى إلى أن تكون المنصة
          الرائدة في تأهيل الكوارد الشابة <br /> وربطها بفرص العمل المناسبة.
          <br /> <br /><br />

          <span style={{ color: '#000000', fontWeight: 'bold' }}>رؤيتنا : </span>
          <br />
          أن نكون الجسر الذي يربط الخريجين بسوق العمل عبر تدريب عملي متكامل.
          <br /> <br />

          <span style={{ color: '#000000', fontWeight: 'bold' }}>رسالتنا : </span>
          <br />
          تقديم برامج تأهيلية حديثة تعتمد على التكنلوجيا والتفاعل المباشر، لدعم جاهزية الخريجين.
          <br /> <br />

          <span style={{ color: '#000000', fontWeight: 'bold' }}> لماذا متنافس ؟ </span>
          <br />
          نستخدم أحدث التقنيات لتقديم تدريب عملي وفعال.<br />
          نقدم فرص تأهيل وشهادات احترافية تعزز التوظيف.<br />
          لدينا شراكات مع كبرى الجهات التوظيفية لضمان جاهزية الخريجين.<br />
        </p>
      </div>
    </section>
  );
}
