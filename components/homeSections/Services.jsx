import {
  PiCameraThin,
  PiReadCvLogoThin,
  PiLinkedinLogoThin,
  PiHandshakeThin,
  PiBriefcaseThin,
  PiUsersThreeThin,
} from "react-icons/pi";

export default function Services() {
  return (
    <section
      id="services"
      style={{
        textAlign: 'center',
        scrollMarginTop: '150px',
        height: '700px',
        paddingLeft: '90px',
        paddingRight: '90px',
      }}
    >
      <h2
        className="custom-arabic-semibold text-[#E46A00]"
        style={{ fontSize: '30px' }}
      >
        خدماتنا
      </h2>

      <div style={{ position: 'relative', width: '100%', height: '220px' }}>
        {[ 
          {
            pos: { left: '70%' },
            label: 'تصوير احترافي',
            description: 'جلسات تصوير لتحسين الصور الشخصية على المنصات الإجتماعية',
            Icon: PiCameraThin,
          },
          {
            pos: { right: '70%' },
            label: ' LinkedIn تحسين حسابات ',
            description: 'إنشاء حسابات مهنية جذابة ومراجعة الحسابات الشخصية',
            Icon: PiLinkedinLogoThin,
          },
          {
            pos: { left: '50%', transform: 'translateX(-50%)' },
            label: 'إعداد السيرة الذاتية',
            description: 'كتابة سيرة ذاتية احترافية تتناسب مع معايير الشركات',
            Icon: PiReadCvLogoThin,
          },
        ].map(({ pos, label, Icon, description }, i) => (
          <div key={i} style={{ position: 'absolute', top: '80px', textAlign: 'center', ...pos }}>
            <div style={{ position: 'relative', width: '50px', height: '50px', margin: '0 auto' }}>
              <div style={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                backgroundColor: '#D1D1D1',
                position: 'absolute',
                top: '3px',
                left: '20px',
                zIndex: 0,
                transform: 'rotate(15deg)',
              }} />
              <Icon style={{ fontSize: '30px', color: '#000000', position: 'relative', zIndex: 1 }} />
            </div>

            <a
              href="#"
              style={{
                fontSize: '16px',
                color: '#333',
                marginTop: '10px',
                display: 'inline-block',
                fontFamily: "'Noto Sans Arabic SemiBold', sans-serif",
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onClick={() => alert(`تم الضغط على: ${label}`)}
            >
              {label}
            </a>

            <p
              style={{
                fontSize: '14px',
                color: '#666',
                fontFamily: "'Noto Sans Arabic Light'",
                fontWeight: 300,
                marginTop: '10px',
                lineHeight: '1.4',
                maxWidth: '180px',
                marginInline: 'auto',
              }}
            >
              {description}
            </p>
          </div>
        ))}

        {[ 
          {
            pos: { left: '70%' },
            label: 'شراكات مع منصات التوظيف',
            description: 'التعاون مع منصات توظيف لتسهيل الوصول إلى فرص العمل',
            Icon: PiHandshakeThin,
          },
          {
            pos: { right: '70%' },
            label: 'التدريب على المقابلات الوظيفية',
            description: 'مقابلات تجريبية وتقييم الأداء لتطوير الثقة',
            Icon: PiBriefcaseThin,
          },
          {
            pos: { left: '50%', transform: 'translateX(-50%)' },
            label: 'فرص التدريب التعاوني',
            description: 'توفير فرص تدريب',
            Icon: PiUsersThreeThin,
          },
        ].map(({ pos, label, Icon, description }, i) => (
          <div key={i} style={{ position: 'absolute', top: '400px', textAlign: 'center', ...pos }}>
            <div style={{ position: 'relative', width: '50px', height: '50px', margin: '0 auto' }}>
              <div style={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                backgroundColor: '#D1D1D1',
                position: 'absolute',
                top: '3px',
                left: '20px',
                zIndex: 0,
                transform: 'rotate(15deg)',
              }} />
              <Icon style={{ fontSize: '30px', color: '#000000', position: 'relative', zIndex: 1 }} />
            </div>

            <a
              href="#"
              style={{
                fontSize: '16px',
                color: '#333',
                marginTop: '10px',
                display: 'inline-block',
                fontFamily: "'Noto Sans Arabic SemiBold', sans-serif",
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {label}
            </a>

            <p
              style={{
                fontSize: '14px',
                color: '#666',
                fontFamily: "'Noto Sans Arabic Light'",
                fontWeight: 300,
                marginTop: '10px',
                lineHeight: '1.4',
                maxWidth: '180px',
                marginInline: 'auto',
              }}
            >
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

