import { useState } from "react";
import { useRouter } from "next/router";
import { isValidEmail, normalizeEmail } from "../lib/email";

export default function Login() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const parseJsonSafe = async (res) => {
    const text = await res.text();
    try { return JSON.parse(text); }
    catch { return { message: text || "خطأ غير متوقع من الخادم" }; }
  };

  const sendCode = async () => {
    const clean = normalizeEmail(email);
    if (!isValidEmail(clean)) { setMsg("صيغة البريد الإلكتروني غير صحيحة "); return; }
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/send-login-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean }),
      });
      const data = await parseJsonSafe(res);
      if (data?.notFound) { setMsg("الحساب غير موجود"); return; }
      if (!res.ok) throw new Error(data.message || "حدث خطأ أثناء إرسال الرمز");
      setStep(2);
    } catch (err) {
      setMsg(err.message || "حدث خطأ أثناء إرسال الرمز");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const clean = normalizeEmail(email);
    if (!isValidEmail(clean)) { setMsg("صيغة البريد الإلكتروني غير صحيحة."); return; }
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/verify-login-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, code }),
      });
      const data = await parseJsonSafe(res);
      if (!res.ok) throw new Error(data.message || "الرمز غير صحيح");

      // خزّني الحالة (لو كنتِ تضيفين isAdmin، ما يأثر على التوجيه)
      localStorage.setItem("logged_in", "1");
      localStorage.setItem("user_name", data.name || "");
      localStorage.setItem("user_email", clean);
      if (typeof data.isAdmin !== "undefined") {
        localStorage.setItem("is_admin", data.isAdmin ? "1" : "0");
      }

      // التوجيه للصفحة الرئيسية فقط
      router.replace("/");
    } catch (err) {
      setMsg(err.message || "حدث خطأ أثناء التحقق من الرمز");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>تسجيل الدخول</h2>

      {step === 1 && (
        <>
          <input style={styles.input} type="email" placeholder="أدخل البريد الإلكتروني"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
          <button style={styles.button} onClick={sendCode} disabled={loading}>
            {loading ? "جارٍ الإرسال..." : "إرسال الرمز"}
          </button>
          <p style={{ marginTop: "10px", color: "#555", fontSize: "14px" }}>
            ليس لديك حساب بعد؟{" "}
            <a href="/signup" style={{ color: "#555", fontWeight: 700, textDecoration: "underline" }}>
              أنشئ حسابك من هنا
            </a>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <input style={styles.input} type="text" placeholder="أدخل الرمز المرسل"
                 value={code} onChange={(e) => setCode(e.target.value)} />
          <button style={styles.button} onClick={handleLogin} disabled={loading}>
            {loading ? "جارٍ التحقق..." : "تأكيد الرمز"}
          </button>
        </>
      )}

      {msg && <div style={styles.msg}>{msg}</div>}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "IBMPlexArabic, sans-serif", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#fff",
  },
  title: { color: "#163853", fontSize: "28px", marginBottom: "20px" },
  input: {
    width: "300px", padding: "12px", marginBottom: "10px", borderRadius: "8px",
    border: "1px solid #ccc", fontSize: "16px", color: "#4e4e4e", boxSizing: "border-box",
  },
  button: {
    width: "300px", padding: "12px", borderRadius: "8px", border: "none",
    backgroundColor: "#C49E7D", color: "#fff", fontSize: "16px", cursor: "pointer",
  },
  msg: { marginTop: "15px", color: "#555", textAlign: "center", fontSize: "14px" },
};
