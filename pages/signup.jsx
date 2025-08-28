// pages/signup.js
import { useState } from "react";
import { useRouter } from "next/router";
import { isValidEmail, normalizeEmail } from "../lib/email";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); 
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const parseJsonSafe = async (res) => {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return { message: text || "خطأ غير متوقع من الخادم" }; }
  };

  const handleSendCode = async () => {
    if (!name.trim()) { setMsg("الرجاء إدخال الاسم أولاً"); return; }
    const clean = normalizeEmail(email);
    if (!isValidEmail(clean)) { setMsg("صيغة البريد الإلكتروني غير صحيحة"); return; }

    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/send-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, name }),
      });
      const data = await parseJsonSafe(res);
      if (data?.exists) { setMsg("الحساب موجود بالفعل"); return; }
      if (!res.ok) throw new Error(data.message || "حدث خطأ أثناء إرسال الرمز");
      setStep(2);
    } catch (err) {
      setMsg(err.message || "حدث خطأ أثناء إرسال الرمز");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const clean = normalizeEmail(email);
    if (!isValidEmail(clean)) { setMsg("صيغة البريد الإلكتروني غير صحيحة."); return; }
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, code }),
      });
      const data = await parseJsonSafe(res);
      if (!res.ok) throw new Error(data.message || "الرمز غير صحيح");

      const isAdmin = !!data.isAdmin;
      localStorage.setItem("logged_in", "1");
      localStorage.setItem("user_name", name || data.name || "");
      localStorage.setItem("user_email", clean);
      localStorage.setItem("is_admin", isAdmin ? "1" : "0");

      const dest = isAdmin ? "/admin/review" : "/dashboard";
      router.replace(dest);
    } catch (err) {
      setMsg(err.message || "حدث خطأ أثناء التحقق من الرمز");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>إنشاء حساب جديد</h2>

      {step === 1 && (
        <>
          <input style={styles.input} type="text" placeholder="الاسم"
                 value={name} onChange={(e) => setName(e.target.value)} />
          <input style={styles.input} type="email" placeholder="البريد الإلكتروني"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
          <button style={styles.button} onClick={handleSendCode} disabled={loading}>
            {loading ? "جارٍ الإرسال..." : "إرسال الرمز"}
          </button>
          <p style={{ marginTop: "10px", color: "#555", fontSize: "14px" }}>
            هل لديك حساب بالفعل؟{" "}
            <a href="/login" style={{ color: "#555", fontWeight: 700, textDecoration: "underline" }}>
              سجّل دخولك من هنا
            </a>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <input style={styles.input} type="text" placeholder="أدخل الرمز المرسل"
                 value={code} onChange={(e) => setCode(e.target.value)} />
          <button style={styles.button} onClick={handleVerify} disabled={loading}>
            {loading ? "جارٍ التحقق..." : "تأكيد الرمز"}
          </button>
        </>
      )}

      {msg && <div style={styles.msg}>{msg}</div>}
    </div>
  );
}

const styles = {
  container: { fontFamily: "IBMPlexArabic, sans-serif", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#fff" },
  title: { color: "#163853", fontSize: "28px", marginBottom: "20px" },
  input: { width: "300px", padding: "12px", marginBottom: "10px", borderRadius: "8px",
    border: "1px solid #ccc", fontSize: "16px", color: "#4e4e4e", boxSizing: "border-box" },
  button: { width: "300px", padding: "12px", borderRadius: "8px", border: "none",
    backgroundColor: "#C49E7D", color: "#fff", fontSize: "16px", cursor: "pointer" },
  msg: { marginTop: "15px", color: "#555", textAlign: "center", fontSize: "14px" },
};
