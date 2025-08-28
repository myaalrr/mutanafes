//my-website / pages/my-services.jsx
import { useEffect, useState } from "react";
const SERVICES = [
  { key: "photo", label: "تصوير احترافي" },
  { key: "linkedin", label: "تحسين حسابات LinkedIn" },
  { key: "cv", label: "إعداد السيرة الذاتية" },
  { key: "partners", label: "شراكات مع منصات التوظيف" },
  { key: "interview", label: "التدريب على المقابلات الوظيفية" },
  { key: "coop", label: "فرص التدريب التعاوني" },
];

export default function MyServices() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [serviceKey, setServiceKey] = useState(SERVICES[0].key);
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // حماية الوصول
  useEffect(() => {
    try {
      const isLogged = localStorage.getItem("logged_in");
      if (isLogged !== "1") window.location.replace("/login");
    } catch {
      window.location.replace("/login");
    }
  }, []);

  // تحميل النتائج
  const loadResults = async () => {
    try {
      const email = localStorage.getItem("user_email");
      if (!email) return;
      const res = await fetch("/api/quiz/my-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email }),
      });
      const data = await res.json();
      if (res.ok) setResults(data.results || []);
    } catch (e) {
      // تجاهل بهدوء
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const submitQuiz = async () => {
    setMsg("");
    // تحقّق بسيط
    if (!q1.trim() || !q2.trim() || !q3.trim()) {
      setMsg("الرجاء تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const email = localStorage.getItem("user_email");
      const name = localStorage.getItem("user_name") || "";
      const payload = {
        user_email: email,
        user_name: name,
        service_key: serviceKey,
        answers: { q1, q2, q3 },
      };

      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "تعذر حفظ الإرسال");

      setMsg("تم استلام طلبك بنجاح");
      setShowQuiz(false);
      setQ1(""); setQ2(""); setQ3("");
      // نحدّث النتائج
      loadResults();
    } catch (e) {
      setMsg(e.message || "تعذر حفظ الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      {/* الهيدر */}
      <header style={styles.header}>
        <h1 style={styles.title}>خدماتي</h1>
      </header>

      {/* زر طلب خدمة */}
      <section style={styles.card}>
        <h2 style={styles.cardTitle}>طلب خدمة</h2>
        <p style={styles.muted}>اختر الخدمة وأجب عن أسئلة بسيطة لتقييم جاهزيتك.</p>

        {!showQuiz ? (
          <button style={styles.primary} onClick={() => setShowQuiz(true)}>
            طلب خدمة
          </button>
        ) : (
          <div style={styles.quizBox}>
            {/* اختيار الخدمة */}
            <label style={styles.label}>اختر الخدمة</label>
            <select
              style={styles.select}
              value={serviceKey}
              onChange={(e) => setServiceKey(e.target.value)}
            >
              {SERVICES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>

            {/* أسئلة بسيطة */}
            <label style={styles.label}>س1: ما مستوى جاهزيتك الحالي في هذه الخدمة؟</label>
            <input
              style={styles.input}
              placeholder="مثال: مبتدئ / متوسط / متقدم"
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
            />

            <label style={styles.label}>س2: ما هدفك الرئيسي من طلب هذه الخدمة؟</label>
            <input
              style={styles.input}
              placeholder="اكتب بإيجاز هدفك"
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
            />

            <label style={styles.label}>س3: هل لديك ملاحظات إضافية؟</label>
            <input
              style={styles.input}
              placeholder="اختياري"
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button style={styles.primary} onClick={submitQuiz} disabled={loading}>
                {loading ? "جارٍ الإرسال..." : "إرسال"}
              </button>
              <button style={styles.secondary} onClick={() => setShowQuiz(false)}>
                إلغاء
              </button>
            </div>
          </div>
        )}

        {msg && <div style={styles.msg}>{msg}</div>}
      </section>

      {/* نتائجي */}
      <section style={styles.card}>
        <h2 style={styles.cardTitle}>نتائجي</h2>

        {results.length === 0 ? (
          <p style={styles.muted}>لا توجد نتائج حتى الآن.</p>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
{results.map((r) => (
  <div key={r.id} style={styles.resultRow}>
    <div>
      <div style={{ fontWeight: 700, color: "#163853" }}>
        {labelFromKey(r.service_key)}
      </div>
      <div style={{ fontSize: 13, color: "#777" }}>
        الحالة: {r.status}
      </div>
      {r.supervisor_name && (
        <div style={{ fontSize: 13, color: "#555" }}>
          المشرف: {r.supervisor_name} ({r.supervisor_number || "بدون رقم"})
        </div>
      )}
      {r.feedback && (
        <div style={{ marginTop: 4, fontSize: 14, color: "#333" }}>
          ملاحظة المشرف: {r.feedback}
        </div>
      )}
    </div>
    <div style={{ fontSize: 12, color: "#999" }}>
      {new Date(r.created_at).toLocaleString("ar-SA")}
    </div>
  </div>
))}

          </div>
        )}
      </section>
    </div>
  );
}

function labelFromKey(key) {
  const m = {
    photo: "تصوير احترافي",
    linkedin: "تحسين حسابات LinkedIn",
    cv: "إعداد السيرة الذاتية",
    partners: "شراكات مع منصات التوظيف",
    interview: "التدريب على المقابلات الوظيفية",
    coop: "فرص التدريب التعاوني",
  };
  return m[key] || key;
}

function statusLabel(s) {
  const m = { pending: "قيد المراجعة", published: "منشور", returned: "مطلوب تعديل" };
  return m[s] || s;
}

const styles = {
  wrap: {
    fontFamily: "IBMPlexArabic, sans-serif",
    direction: "rtl",
    maxWidth: "960px",
    margin: "0 auto",
    padding: "24px 16px",
    background: "#fff",
    boxSizing: "border-box",
  },
  header: { marginBottom: "16px" },
  title: { color: "#163853", margin: 0, fontSize: "28px" },

  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "12px",
  },
  cardTitle: { color: "#163853", fontSize: "18px", margin: "0 0 8px 0" },
  muted: { color: "#777", margin: 0, fontSize: "14px" },

  primary: {
    backgroundColor: "#C49E7D",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  secondary: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #C49E7D",
    backgroundColor: "transparent",
    color: "#163853",
    fontSize: "16px",
    cursor: "pointer",
  },

  quizBox: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "12px",
    marginTop: "8px",
  },
  label: { display: "block", margin: "8px 0 6px", color: "#163853", fontSize: "14px" },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "#4e4e4e",
    boxSizing: "border-box",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "#4e4e4e",
    boxSizing: "border-box",
    marginBottom: "8px",
  },
  msg: {
    marginTop: "10px",
    color: "#555",
    fontSize: "14px",
  },
  resultRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    border: "1px solid #f0f0f0",
    borderRadius: "10px",
    padding: "10px 12px",
  },
};
