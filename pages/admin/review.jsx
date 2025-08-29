// my-website/pages/admin/review.jsx
import { useEffect, useState } from "react";

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

function safeUserEmail() {
  try {
    return (localStorage.getItem("user_email") || "").trim().toLowerCase();
  } catch {
    return "";
  }
}

// شارة الحالة: حدّ + نص فقط (بدون تعبئة) وبدون Bold
function badgeStyleFor(status) {
  const isAccepted = status === "مقبول";
  const color = isAccepted ? "#166534" : "#6B7280"; // أخضر غامق / رمادي
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

export default function AdminReview() {
  const [status, setStatus] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const isLogged = localStorage.getItem("logged_in");
      if (isLogged !== "1") window.location.replace("/login");
    } catch {
      window.location.replace("/login");
    }
  }, []);

  async function load() {
    setLoading(true);
    setMsg("");
    try {
      const email = safeUserEmail();
      if (!email) {
        setMsg("يرجى تسجيل الدخول أولاً.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/quiz/admin-list?status=${encodeURIComponent(status)}`, {
        headers: { "x-user-email": email },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        const extra = data?.details ? ` • ${data.details}` : "";
        throw new Error((data?.message || "failed") + extra);
      }
      setItems(data.items || []);
    } catch (e) {
      setMsg(e.message || "تعذّر التحميل");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateItem(id, newStatus, supervisor_number, supervisor_name, feedback) {
    setLoading(true);
    setMsg("");
    try {
      const email = safeUserEmail();
      if (!email) {
        setMsg("يرجى تسجيل الدخول أولاً.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/quiz/admin-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": email,
        },
        body: JSON.stringify({ id, status: newStatus, supervisor_number, supervisor_name, feedback }),
      });
      const data = await res.json();
      if (!res.ok) {
        const extra = data?.details ? ` • ${data.details}` : "";
        throw new Error((data?.message || "update failed") + extra);
      }
      setMsg("تم التحديث");
      await load();
    } catch (e) {
      setMsg(e.message || "تعذّر التحديث");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>لوحة مراجعة الطلبات</h1>

      <div style={styles.card}>
        <div style={styles.toolbar}>
          <label style={styles.label}>الحالة</label>
          <select
            style={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="all">الكل</option>
            <option value="قيد المراجعة">قيد المراجعة</option>
            <option value="مقبول">مقبول</option>
          </select>
          <button style={styles.button} onClick={load} disabled={loading}>
            {loading ? "جارٍ التحميل..." : "تحميل"}
          </button>
        </div>
      </div>

      {msg && <div style={styles.errorMsg}>{msg}</div>}

      {items.map((it) => (
        <div key={it.id} style={styles.item}>
          <div style={styles.itemMain}>
            {/* التاريخ أعلى الطلب - تاريخ فقط */}
            <div style={styles.timeTop}>
              تاريخ الإرسال: {new Date(it.created_at).toLocaleDateString("ar-SA")}
            </div>

            {/* العنوان + شارة الحالة جنب الاسم */}
            <div style={styles.titleRow}>
              <div style={styles.itemTitle}>
                {labelFromKey(it.service_key)} • {it.user_name || it.user_email}
              </div>
              <span style={badgeStyleFor(it.status)}>{it.status}</span>
            </div>

            {/* الأسئلة/الأجوبة */}
            <div style={styles.qaList}>
              <div style={styles.metaRow}>
                <span style={styles.qLabel}>س1: ما مستوى جاهزيتك الحالي في هذه الخدمة؟</span>{" "}
                <span style={styles.aStrong}>{it?.answers?.q1 || "—"}</span>
              </div>
              <div style={styles.metaRow}>
                <span style={styles.qLabel}>س2: ما هدفك الرئيسي من طلب هذه الخدمة؟</span>{" "}
                <span style={styles.aStrong}>{it?.answers?.q2 || "—"}</span>
              </div>
              <div style={styles.metaRow}>
                <span style={styles.qLabel}>س3: هل لديك ملاحظات إضافية؟</span>{" "}
                <span style={styles.aStrong}>{it?.answers?.q3 || "—"}</span>
              </div>
            </div>

            {/* ⬇️⬇️ الآن مربع المشرف هنا: تحت الأسئلة وفوق "ملاحظة سابقة" */}
            {it.supervisor_name && (
              <div style={styles.noteBox}>
                <span style={styles.noteLabel}>المشرف:</span>{" "}
                <span style={styles.noteText}>
                  {it.supervisor_name}
                  {it.supervisor_number ? " (" + it.supervisor_number + ")" : ""}
                </span>
              </div>
            )}

            {/* مربع "ملاحظة سابقة" */}
            {it.feedback && (
              <div style={styles.noteBox}>
                <span style={styles.noteLabel}>ملاحظة سابقة:</span>{" "}
                <span style={styles.noteText}>{it.feedback}</span>
              </div>
            )}
          </div>

          <ReviewForm
            onSubmit={(vals) =>
              updateItem(it.id, vals.status, vals.supervisor_number, vals.supervisor_name, vals.feedback)
            }
          />
        </div>
      ))}
    </div>
  );
}

function ReviewForm({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("مقبول");
  const [supervisorNumber, setSupervisorNumber] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div style={styles.form}>
      {/* طيّة قرار المشرف */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={styles.disclosure}
      >
        <span style={{ ...styles.caret, transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▸</span>
        قرار المشرف
      </button>

      {open && (
        <>
          <div style={styles.formGrid}>
            <label style={styles.label}>الحالة</label>
            <select style={styles.field} value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option value="مقبول">مقبول</option>
              <option value="قيد المراجعة">قيد المراجعة</option>
            </select>

            <label style={styles.label}>رقم المشرف</label>
            <input
              style={styles.field}
              value={supervisorNumber}
              onChange={(e)=>setSupervisorNumber(e.target.value)}
              placeholder="+966"
            />

            <label style={styles.label}>اسم المشرف</label>
            <input
              style={styles.field}
              value={supervisorName}
              onChange={(e)=>setSupervisorName(e.target.value)}
              placeholder="اسم المشرف"
            />

            <label style={styles.label}>ملاحظة المشرف</label>
            <textarea
              style={styles.textarea}
              value={feedback}
              onChange={(e)=>setFeedback(e.target.value)}
              placeholder="اكتب ملاحظتك هنا"
            />
          </div>

          <button
            style={styles.saveButton}
            onClick={() =>
              onSubmit({
                status,
                supervisor_number: supervisorNumber || undefined,
                supervisor_name: supervisorName || undefined,
                feedback,
              })
            }
          >
            حفظ
          </button>
        </>
      )}
    </div>
  );
}

/* ============== STYLES ============== */
const fieldPaddingY = "clamp(8px, 2.2vw, 12px)";
const fieldPaddingX = "clamp(10px, 2.5vw, 14px)";
const fieldHeight = "clamp(42px, 5vw, 48px)";

const styles = {
  wrap: {
    direction: "rtl",
    fontFamily: "IBMPlexArabic, sans-serif",
    maxWidth: "92vw",
    margin: "0 auto",
    padding: "clamp(12px, 3vw, 28px) clamp(10px, 4vw, 24px)",
  },
  title: {
    color: "#163853",
    margin: 0,
    marginBottom: "clamp(8px, 2vw, 16px)",
    fontSize: "clamp(18px, 3.5vw, 26px)",
    lineHeight: 1.3,
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "1.2rem",
    padding: "clamp(8px, 2.5vw, 16px)",
    marginBottom: "clamp(8px, 2vw, 16px)",
    background: "#fff",
  },
  toolbar: {
    display: "flex",
    gap: "clamp(6px, 2vw, 12px)",
    alignItems: "center",
    flexWrap: "wrap",
  },
  label: { fontSize: "clamp(12px, 2.3vw, 14px)", color: "#163853" },

  field: {
    padding: `${fieldPaddingY} ${fieldPaddingX}`,
    height: fieldHeight,
    borderRadius: "0.8rem",
    border: "1px solid #ccc",
    width: "100%",
    minWidth: "0",
    boxSizing: "border-box",
  },
  textarea: {
    padding: `${fieldPaddingY} ${fieldPaddingX}`,
    borderRadius: "0.8rem",
    border: "1px solid #ccc",
    minHeight: "clamp(110px, 18vw, 140px)",
    width: "100%",
    resize: "vertical",
    boxSizing: "border-box",
  },

  select: {
    padding: `${fieldPaddingY} ${fieldPaddingX}`,
    height: fieldHeight,
    borderRadius: "0.8rem",
    border: "1px solid #ccc",
    minWidth: "min(50vw, 220px)",
    boxSizing: "border-box",
  },
  button: {
    padding: `${fieldPaddingY} ${fieldPaddingX}`,
    borderRadius: "1rem",
    border: "none",
    background: "#C49E7D",
    color: "#fff",
    cursor: "pointer",
  },
  errorMsg: { color: "#b00", marginBottom: "clamp(6px, 1.8vw, 12px)", fontSize: "clamp(12px, 2.5vw, 14px)" },

  // بطاقة الطلب
  item: {
    display: "flex",
    flexWrap: "wrap",
    gap: "clamp(10px, 2.6vw, 16px)",
    alignItems: "flex-start",
    border: "1px solid #f0f0f0",
    borderRadius: "1.2rem",
    padding: "clamp(12px, 2.8vw, 18px)",
    marginBottom: "clamp(14px, 3vw, 24px)",
    background: "#fff",
    boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
  },
  itemMain: {
    flex: "1 1 60%",
    minWidth: "min(100%, 560px)",
  },

  // التاريخ أعلى الطلب (بدون وقت)
  timeTop: {
    fontSize: "clamp(11px, 2.3vw, 12px)",
    color: "#999",
    marginBottom: "clamp(8px, 2vw, 12px)",
  },

  // العنوان + الشارة
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "clamp(6px, 1.6vw, 10px)",
  },
  itemTitle: {
    fontWeight: 700,
    color: "#163853",
    fontSize: "clamp(14px, 2.8vw, 16px)",
    lineHeight: 1.4,
    wordBreak: "break-word",
  },

  // مربعات موحّدة (المشرف / ملاحظة سابقة)
  noteBox: {
    marginTop: "clamp(10px, 2.6vw, 14px)",
    background: "#fafafa",
    border: "1px solid #eee",
    padding: "clamp(8px, 2.2vw, 12px)",
    borderRadius: "0.8rem",
    fontSize: "clamp(12px, 2.5vw, 14px)",
    color: "#333",
  },
  noteLabel: { color: "#163853", fontWeight: 400 },
  noteText: { color: "#333", fontWeight: 400 },

  // الأسئلة/الأجوبة
  qaList: {
    display: "grid",
    gap: "clamp(6px, 1.8vw, 10px)",
    marginTop: "clamp(8px, 2vw, 12px)",
  },
  metaRow: { fontSize: "clamp(12px, 2.5vw, 13px)" },
  qLabel: { color: "#777", fontWeight: 300 }, // السؤال رمادي خفيف
  aStrong: { color: "#000", fontWeight: 400 }, // الجواب أسود أوضح

  // نموذج المراجعة
  form: {
    flex: "1 1 34%",
    minWidth: "min(100%, 300px)",
    border: "1px solid #eee",
    borderRadius: "1.2rem",
    padding: "clamp(8px, 2.2vw, 12px)",
    background: "#fcfcfc",
  },
  disclosure: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "flex-start",
    border: "none",
    background: "transparent",
    padding: `${fieldPaddingY} ${fieldPaddingX}`,
    borderRadius: "0.9rem",
    cursor: "pointer",
    fontSize: "clamp(14px, 2.6vw, 16px)",
    color: "#163853",
  },
  caret: {
    display: "inline-block",
    transition: "transform 0.18s ease",
    fontSize: "clamp(14px, 2.6vw, 16px)",
    lineHeight: 1,
  },
  formGrid: {
    display: "grid",
    gap: "clamp(6px, 2vw, 10px)",
    gridTemplateColumns: "1fr",
    marginTop: "clamp(4px, 1.2vw, 8px)",
  },
  saveButton: {
    marginTop: "clamp(14px, 3vw, 24px)",
    width: "100%",
    padding: `${fieldPaddingY} ${fieldPaddingX}`,
    height: fieldHeight,
    borderRadius: "1rem",
    border: "none",
    background: "#C49E7D",
    color: "#fff",
    cursor: "pointer",
  },
}; 