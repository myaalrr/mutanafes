/*my-website > components > homeSection > Why.jsx */
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Why() {
  const items = [
    "نستخدم أحدث التقنيات لتقديم تدريب عملي وفعال",
    "نقدم فرص تأهيل وشهادات احترافية تعزز التوظيف",
    "لدينا شراكات مع كبرى الجهات التوظيفية لضمان جاهزية الخريجين"
  ];

  const sectionRef = useRef(null);
  const [sectionInViewRef, sectionInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    sectionInViewRef(sectionRef.current);
  }, [sectionInViewRef]);

  useEffect(() => {
    if (sectionInView && sectionRef.current) {
      sectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [sectionInView]);

  return (
<section
  ref={sectionRef}
  style={{
    position: 'relative',
    scrollSnapType: 'y mandatory',
    scrollBehavior: 'smooth',
  }}
>

<h2
  style={{
    position: 'sticky',                 // يخليه ثابت داخل السكشن
    top: '15%',                        // مسافة من فوق
    fontSize: 'min(4vw, 20px)',
    fontFamily: 'NotoSansArabicCondensedExtraLight',
    color: '#C49E7D',
    textAlign: 'right',
    marginRight: '3%',
    marginTop: '1rem',
  }}
>
  لماذا متنافس ؟
</h2>


      {items.map((item, index) => {
        const [ref, inView] = useInView({ threshold: 0.5 });

        return (
          <div
            key={index}
            ref={ref}
            style={{
              position: 'relative',
              minHeight: "50vh",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              scrollSnapAlign: 'center',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                right: '20%',
                top: '50%',
                transform: 'translateY(-50%) rotate(45deg)',
                width: '2vw',
                height: '2vw',
                backgroundColor: '#163853',
                borderRadius: '2px',
                animation: 'spin 3s linear infinite',
                pointerEvents: 'none',
              }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            <AnimatePresence>
              {inView && (
                <motion.p
                  initial={{ opacity: 0, y: 50, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.7 }}
                  transition={{ duration: 0.8 }}
style={{
  fontSize: 'min(5vw, 30px)',
  fontFamily: "'IBMPlexArabic', sans-serif",
  color: "#000",
  textAlign: 'right',
  margin: '0 auto',                           // يخلي النص بالمنتصف
  maxWidth: 'min(50%, 600px)',                // أقصى عرض 600px وبنفس الوقت ياخذ حتى 90% من الشاشة
  paddingLeft: '2rem',                        // padding يسار يبعد الكلام شوي
  paddingRight: '2rem',                       // padding يمين نفس الشيء

}}

                >
                  {item}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <style>{`
        @keyframes spin {
          from { transform: translateY(-50%) rotate(0deg) rotate(45deg); }
          to { transform: translateY(-50%) rotate(360deg) rotate(45deg); }
        }
      `}</style>
    </section>
  );
}
