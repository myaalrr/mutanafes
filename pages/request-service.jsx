// my-website/pages/request-service.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// مفاتيح موحّدة مع الجدول والـ API
const SERVICES = [
  { id: "photo", name: "تصوير احترافي" },
  { id: "linkedin", name: "تحسين حسابات LinkedIn" },
  { id: "cv", name: "إعداد السيرة الذاتية" },
  { id: "partners", name: "شراكات مع منصات التوظيف" },
  { id: "interview", name: "التدريب على المقابلات الوظيفية" },
  { id: "coop", name: "فرص التدريب التعاوني" },
];

const QUIZZES = {
  photo: [
    { q: "هل لديك صور مهنية حديثة؟", key:"q1", opts: ["نعم", "لا"] },
    { q: "ما الهدف من الصور؟", key:"q2", opts: ["LinkedIn", "سيرة ذاتية", "بروفايل عام"] },
    { q: "هل تفضّل جلسة داخلية أم خارجية؟", key:"q3", opts: ["داخلية", "خارجية", "لا فرق"] },
  ],
  linkedin: [
    { q: "هل ملفك مكتمل (صورة/نبذة/خبرات)؟", key:"q1", opts: ["مكتمل", "متوسط", "ضعيف"] },
    { q: "هل تكتب منشورات مهنية؟", key:"q2", opts: ["بشكل دوري", "أحيانًا", "نادراً/أبدًا"] },
    { q: "هل لديك كلمات مفتاحية مناسبة؟", key:"q3", opts: ["نعم", "لا", "غير متأكد"] },
  ],
  cv: [
    { q: "هل لديك سيرة ذاتية حالية؟", key:"q1", opts: ["نعم", "لا"] },
    { q: "هل تحتوي على إنجازات رقمية؟", key:"q2", opts: ["نعم", "لا"] },
    { q: "لغة السيرة المناسبة لك؟", key:"q3", opts: ["عربية", "إنجليزية"] },
  ],
  partners: [
    { q: "ما مستوى خبرتك؟", key:"q1", opts: ["طالب/خريج", "1–3 سنوات", "أكثر من 3"] },
    { q: "ما نوع الوظائف المستهدفة؟", key:"q2", opts: ["تقنية", "إدارية", "تسويق/مبيعات", "تصميم"] },
    { q: "هل تتابع المنصات أسبوعياً؟", key:"q3", opts: ["نعم", "لا"] },
  ],
  interview: [
    { q: "خبرتك في المقابلات؟", key:"q1", opts: ["ولا مرة", "1–3 مرات", "أكثر"] },
    { q: "تعرف طريقة STAR؟", key:"q2", opts: ["نعم", "لا"] },
    { q: "درجة التوتر لديك؟", key:"q3", opts: ["منخفض", "متوسط", "مرتفع"] },
  ],
  coop: [
    { q: "موعد تدريبك التعاوني؟", key:"q1", opts: ["هذا الفصل", "الفصل القادم", "غير محدد"] },
    { q: "هل جهّزت سيرتك وخطابك؟", key:"q2", opts: ["جاهزة", "جزئياً", "لا"] },
    { q: "هل لديك جهات مستهدفة؟", key:"q3", opts: ["نعم", "لا"] },
  ],
};

export default function RequestService() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    try {
      const isLogged = typeof window !== "undefined" ? localStorage.getItem("logged_in") : null;
      if (isLogged !== "1") window.location.replace("/login");
    } catch {
      window.location.replace("/login");
    }
  }, []);

  const quiz = service ? QUIZZES[service] || [] : [];

  const submitQuiz = async () => {
    setMsg("");
    if (!service) return setMsg("الرجاء اختيار خدمة أولاً");
    // تحقق بسيط: كل الأسئلة مجابة
    for (const q of quiz) {
      if (!answers[q.key]) return setMsg("الرجاء الإجابة على جميع الأسئلة");
    }

    const email = localStorage.getItem("user_email");
    const name = localStorage.getItem("user_name") || "";
    if (!email) return setMsg("الرجاء تسجيل الدخول");

    setSending(true);
    try {
      const payload = {
        user_email: email,
        user_name: name,
        service_key: service,
        answers, // jsonb
      };
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "تعذّر إرسال الطلب");

      setMsg("تم استلام طلبك. سيطلع المشرف على إجاباتك ويرد عليك في صفحة (نتائجي).");
      // انتقال لنتائجي
      setTimeout(() => router.push("/my-services"), 800);
    } catch (e) {
      setMsg(e.message || "تعذّر إرسال الطلب");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <header style={styles.header}><h1 style={styles.title}>طلب خدمة</h1></header>

      <section style={styles.card}>
        <h2 style={styles.cardTitle}>اختر الخدمة</h2>
        <select style={styles.select} value={service} onChange={(e)=>{ setService(e.target.value); setAnswers({}); }}>
          <option value="">—</option>
          {SERVICES.map((s)=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </section>

      {service && (
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>أسئلة قصيرة</h2>
          {quiz.map((item, idx) => (
            <div key={idx} style={styles.qBox}>
              <div style={styles.qText}>{item.q}</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {item.opts.map((o) => (
                  <label key={o} style={styles.opt}>
                    <input
                      type="radio"
                      name={item.key}
                      value={o}
                      onChange={() => setAnswers({ ...answers, [item.key]: o })}
                    />{" "}
                    {o}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button style={styles.button} onClick={submitQuiz} disabled={sending}>
            {sending ? "جارٍ الإرسال..." : "إرسال الطلب للمشرف"}
          </button>
          {msg && <div style={styles.msg}>{msg}</div>}
        </section>
      )}
    </div>
  );
}

const styles = {
  wrap: { fontFamily:"IBMPlexArabic, sans-serif", direction:"rtl", maxWidth:"960px", margin:"0 auto", padding:"24px 16px" },
  header: { marginBottom:"16px" },
  title: { color:"#163853", margin:0, fontSize:"28px" },
  card: { background:"#fff", border:"1px solid #eee", borderRadius:"14px", padding:"16px", marginBottom:"12px" },
  cardTitle: { color:"#163853", fontSize:"18px", margin:"0 0 8px 0" },
  select: { width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #ccc", fontSize:"16px", color:"#4e4e4e" },
  qBox: { border:"1px solid #eee", borderRadius:"10px", padding:"12px", marginBottom:"10px" },
  qText: { marginBottom:"8px", color:"#163853", fontWeight:700 },
  opt: { color:"#333", fontSize:"14px" },
  button: { width:"300px", padding:"12px", borderRadius:"8px", border:"none", backgroundColor:"#C49E7D", color:"#fff", fontSize:"16px", cursor:"pointer" },
  msg: { marginTop:"10px", color:"#555", fontSize:"14px" },
};

