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

export default function AdminReview() {
  const [status, setStatus] = useState("قيد المراجعة");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // حماية بسيطة: لازم المستخدم يكون مسجّل دخول
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
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <label style={styles.label}>الحالة</label>
          <select style={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="قيد المراجعة">قيد المراجعة</option>
            <option value="مقبول">مقبول</option>
            <option value="all">الكل</option>
          </select>
          <button style={styles.button} onClick={load} disabled={loading}>
            {loading ? "جارٍ التحميل..." : "تحميل"}
          </button>
        </div>
      </div>

      {msg && <div style={{ color: "#b00", marginBottom: 12 }}>{msg}</div>}

      {items.map((it) => (
        <div key={it.id} style={styles.item}>
          <div style={{flex:1}}>
            <div style={{fontWeight:700, color:"#163853"}}>
              {labelFromKey(it.service_key)} • {it.user_name || it.user_email}
            </div>
            <div style={{fontSize:13, color:"#777", marginTop:4}}>
              الحالة الحالية: {it.status}
              {it.supervisor_name ? ` • المشرف: ${it.supervisor_name}${it.supervisor_number ? " ("+it.supervisor_number+")" : ""}` : ""}
            </div>

            <div style={{marginTop:10}}>
              <b>الأسئلة والإجابات:</b>
              <div style={styles.qaGrid}>
                <div style={styles.qaRow}>
                  <div style={styles.qTitle}>س1: ما مستوى جاهزيتك الحالي في هذه الخدمة؟</div>
                  <div style={styles.aText}>{it?.answers?.q1 || "—"}</div>
                </div>
                <div style={styles.qaRow}>
                  <div style={styles.qTitle}>س2: ما هدفك الرئيسي من طلب هذه الخدمة؟</div>
                  <div style={styles.aText}>{it?.answers?.q2 || "—"}</div>
                </div>
                <div style={styles.qaRow}>
                  <div style={styles.qTitle}>س3: هل لديك ملاحظات إضافية؟</div>
                  <div style={styles.aText}>{it?.answers?.q3 || "—"}</div>
                </div>
              </div>
            </div>

            {it.feedback && <div style={{marginTop:6}}>ملاحظة سابقة: {it.feedback}</div>}

            <div style={{fontSize:12, color:"#999", marginTop:6}}>
              تاريخ الإرسال: {new Date(it.created_at).toLocaleString("ar-SA")}
            </div>
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
  const [status, setStatus] = useState("مقبول");
  const [supervisorNumber, setSupervisorNumber] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div style={styles.form}>
      <div style={{display:"grid", gap:6}}>
        <label style={styles.label}>الحالة</label>
        <select style={styles.select} value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="مقبول">مقبول</option>
          <option value="قيد المراجعة">قيد المراجعة</option>
        </select>

        <label style={styles.label}>رقم المشرف</label>
        <input
          style={styles.input}
          value={supervisorNumber}
          onChange={(e)=>setSupervisorNumber(e.target.value)}
          placeholder="مثال: 101"
        />

        <label style={styles.label}>اسم المشرف</label>
        <input
          style={styles.input}
          value={supervisorName}
          onChange={(e)=>setSupervisorName(e.target.value)}
          placeholder="اسم المشرف"
        />

        <label style={styles.label}>ملاحظة المشرف</label>
        <textarea style={styles.textarea} value={feedback} onChange={(e)=>setFeedback(e.target.value)} placeholder="اكتب ملاحظتك هنا" />
      </div>

      <button
        style={styles.button}
        onClick={() =>
          onSubmit({
            status,
            supervisor_number: supervisorNumber || undefined,
            supervisor_name: supervisorName || undefined,
            feedback,
          })
        }
      >
        حفظ القرار
      </button>
    </div>
  );
}

const styles = {
  wrap: { direction:"rtl", fontFamily:"IBMPlexArabic, sans-serif", maxWidth:1000, margin:"0 auto", padding:"24px 16px" },
  title: { color:"#163853", margin:0, marginBottom:16 },
  card: { border:"1px solid #eee", borderRadius:12, padding:12, marginBottom:12 },
  label: { fontSize:14, color:"#163853" },
  input: { padding:"10px 12px", borderRadius:8, border:"1px solid #ccc", minWidth:280 },
  textarea: { padding:"10px 12px", borderRadius:8, border:"1px solid #ccc", minHeight:90 },
  select: { padding:"10px 12px", borderRadius:8, border:"1px solid #ccc" },
  button: { padding:"10px 14px", borderRadius:8, border:"none", background:"#C49E7D", color:"#fff", cursor:"pointer" },
  item: { display:"flex", gap:12, alignItems:"flex-start", border:"1px solid #f0f0f0", borderRadius:12, padding:12, marginBottom:10 },
  form: { minWidth:280, border:"1px solid #eee", borderRadius:12, padding:10 },

  qaGrid: { display:"grid", gap:8, marginTop:6 },
  qaRow: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, alignItems:"start", background:"#fafafa", border:"1px solid #eee", borderRadius:8, padding:"8px 10px" },
  qTitle: { fontWeight:600, color:"#163853" },
  aText: { color:"#333", whiteSpace:"pre-wrap" },
};

