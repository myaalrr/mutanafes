// my-website/pages/my-services.jsx
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

  useEffect(() => {
    try {
      const isLogged = localStorage.getItem("logged_in");
      if (isLogged !== "1") window.location.replace("/login");
    } catch {
      window.location.replace("/login");
    }
  }, []);

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
    } catch (e) {}
  };

  useEffect(() => {
    loadResults();
  }, []);

  const submitQuiz = async () => {
    setMsg("");
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
      loadResults();
    } catch (e) {
      setMsg(e.message || "تعذر حفظ الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <header style={styles.header}>
        <h1 style={styles.title}>خدماتي</h1>
      </header>

      <div style={styles.noBorderCard}>
        {!showQuiz ? (
          <button style={styles.primary} onClick={() => setShowQuiz(true)}>
            طلب خدمة
          </button>
        ) : (
          <div style={styles.quizBox}>
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

            <div style={styles.actionsRow}>
              <button style={styles.primary} onClick={submitQuiz} disabled={loading}>
                {loading ? "جارٍ الإرسال..." : "إرسال"}
              </button>
              <button style={styles.secondary} onClick={() => setShowQuiz(false)}>
                إلغاء
              </button>
            </div>

            {msg && <div style={styles.msg}>{msg}</div>}
          </div>
        )}
      </div>

      <section style={styles.card}>
        <h2 style={styles.cardTitle}>نتائجي</h2>

        {results.length === 0 ? (
          <p style={styles.muted}>لا توجد نتائج حتى الآن.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {results.map((r) => (
              <div key={r.id} style={styles.resultRow}>
                <div style={styles.resultMain}>
                  <div style={styles.serviceRow}>
                    <span style={styles.serviceName}>{labelFromKey(r.service_key)}</span>
                    <span style={badgeStyleFor(r.status)}>{r.status}</span>
                  </div>

                  {r.supervisor_name && (
                    <div style={styles.supervisorLine}>
                      المشرف: {r.supervisor_name} ({r.supervisor_number || "بدون رقم"})
                    </div>
                  )}
                  {r.feedback && (
                    <div style={styles.feedbackLine}>
                      <span style={styles.feedbackLabel}>ملاحظة المشرف:</span>{" "}
                      <span>{r.feedback}</span>
                    </div>
                  )}
                </div>
                <div style={styles.createdAt}>
                  {new Date(r.created_at).toLocaleDateString("ar-SA")}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ============== HELPERS ============== */
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

function badgeStyleFor(status) {
  let color = "#6B7280";
  if (status === "مقبول") {
    color = "#166534";
  } else if (status === "قيد المراجعة") {
    color = "#6B7280";
  }
  return {
    color,
    background: "transparent",
    border: `1px solid ${color}`,
    padding: "2px 10px",
    borderRadius: "999px",
    fontSize: "clamp(12px, 2.3vw, 13px)",
    fontWeight: 400,
    lineHeight: 1.6,
    whiteSpace: "nowrap",
  };
}

/* ============== STYLES ============== */
const styles = {
  wrap: {
    fontFamily: "IBMPlexArabic, sans-serif",
    direction: "rtl",
    width: "min(92vw, 960px)",
    margin: "0 auto",
    padding: "20px",
    background: "#fff",
    boxSizing: "border-box",
  },
  header: { marginBottom: "14px" },
  title: { color: "#163853", margin: 0, fontSize: "22px" },

  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "12px",
  },
  noBorderCard: {
    background: "#fff",
    border: "none",
    borderRadius: "0",
    padding: "0 0 16px 0",
    marginBottom: "12px",
  },
  cardTitle: { color: "#163853", fontSize: "16px", margin: "0 0 6px" },
  muted: { color: "#777", margin: 0, fontSize: "13px" },

  primary: {
    backgroundColor: "#C49E7D",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  secondary: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #C49E7D",
    backgroundColor: "transparent",
    color: "#163853",
    fontSize: "14px",
    cursor: "pointer",
  },

  quizBox: {
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "12px",
    marginTop: "8px",
  },
  label: { display: "block", margin: "6px 0 4px", color: "#163853", fontSize: "13px" },
  select: {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "13px",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "13px",
    marginBottom: "6px",
  },
  actionsRow: { display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" },

  msg: { marginTop: "8px", color: "#555", fontSize: "13px" },

  resultRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    border: "1px solid #f0f0f0",
    borderRadius: "10px",
    padding: "10px",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  resultMain: { minWidth: 0, flex: "1 1 280px" },

  serviceRow: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" },
  serviceName: { color: "#163853", fontSize: "14px", fontWeight: 400 }, // بدون بولد

  supervisorLine: { fontSize: "12px", color: "#555", fontWeight: 400 }, // بدون بولد
  feedbackLine: { marginTop: "3px", fontSize: "13px", color: "#333", fontWeight: 400 }, // بدون بولد
  feedbackLabel: { color: "#163853", fontWeight: 400 }, // كلمة "ملاحظة المشرف" باللون الأزرق
  createdAt: { fontSize: "12px", color: "#999", fontWeight: 400 }, // بدون بولد
};
