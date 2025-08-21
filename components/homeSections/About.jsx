/*my-website >components > homeSection > About.jsx */
import { motion } from "framer-motion";

export default function About() {
  const text = `متنافس هي منصة تأهيل مهني متكاملة تهدف إلى تمكين الطلاب والخريجين للاستعداد لسوق العمل عبر مجموعة من الخدمات المتكاملة التي تهدف إلى تعزيز مهاراتهم وتسريع وصولهم إلى الفرص الوظيفية.

تأسست عام 2024 في حاضنة الأعمال بجامعة المجمعة، وتسعى إلى أن تكون المنصة الرائدة في تأهيل الكوارد الشابة وربطها بفرص العمل المناسبة.`;

  const words = text.split(" ");

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      <motion.p
        style={{
    maxWidth: "clamp(300px, 80%, 800px)",
    fontSize: "clamp(1rem, 2vw, 20px)", // حجم أصغر مناسب للجوال
    fontFamily: "'IBMPlexArabic-Bold', sans-serif",
    lineHeight: 2,
    whiteSpace: "pre-wrap",
        }}
        initial={{ opacity: 1 }}
        whileInView="visible"
        viewport={{ once: false, amount: 1 }} // يبدأ التأثير لما السكشن يكون ظاهر 100%
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ color: "#C49E7D" }}
            whileInView={{ color: "#000" }}
            viewport={{ once: false, amount: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.03,
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}


