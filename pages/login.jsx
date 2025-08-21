"use client";
import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [name, setName] = useState("");
  const [accountNotFound, setAccountNotFound] = useState(false);

  const sendOtp = async () => {
    try {
      // الرقم التجريبي
      if (phone === "0500000000") {
        setConfirmation({ confirm: (code) => code === "123456" ? Promise.resolve({ user: { uid: "demoUser" } }) : Promise.reject() });
        setMessageType("success");
        setMessage("تم إرسال الرمز التجريبي ✅");
        return;
      }

      // تحقق من وجود الحساب مسبقًا
      const snapshot = await get(ref(db, `users/${phone.startsWith("0") ? "+966" + phone.slice(1) : "+966" + phone}/name`));
      if (!snapshot.exists()) {
        setAccountNotFound(true);
        setMessage("");
        return;
      }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
      }

      const formattedPhone = phone.startsWith("0") ? "+966" + phone.slice(1) : "+966" + phone;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      setMessageType("success");
      setMessage("تم إرسال رمز التحقق ✅");
      setAccountNotFound(false);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("خطأ في إرسال الرمز ❌");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmation.confirm(otp);
      const user = result.user || { uid: "demoUser" };

      // جلب الاسم من قاعدة البيانات
      const snapshot = await get(ref(db, `users/${user.uid}/name`));
      setName(snapshot.exists() ? snapshot.val() : "مستخدم");

      setMessageType("success");
      setMessage(`مرحباً ${snapshot.val()}, تم تسجيل الدخول بنجاح ✅`);

      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("رمز التحقق غير صحيح ❌");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>تسجيل الدخول</h2>

      <input type="tel" placeholder="05XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />

      {!confirmation ? (
        <button style={buttonStyle} onClick={sendOtp}>إرسال الرمز</button>
      ) : (
        <>
          <input type="text" placeholder="أدخل الرمز" value={otp} onChange={(e) => setOtp(e.target.value)} style={inputStyle} />
          <button style={buttonStyle} onClick={verifyOtp}>تأكيد الرمز</button>
        </>
      )}

      {message && <p style={{ ...messageStyle, color: messageType === "success" ? "#637e64ff" : "#C49E7D" }}>{message}</p>}

      {/* إشعار الحساب غير موجود */}
      {accountNotFound && (
        <div style={noticeStyle}>
          الحساب غير موجود، <button style={linkStyle} onClick={() => router.push("/signup")}>أنشئ حسابك من هنا</button>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}

const containerStyle = { maxWidth: 400, margin: "50px auto", padding: 20, fontFamily: "IBMPlexArabic" };
const titleStyle = { textAlign: "center", marginBottom: 20 };
const inputStyle = { padding: "12px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #f5f5f5", fontSize: "16px", width: "100%", boxSizing: "border-box" };
const buttonStyle = { backgroundColor: "#C49E7D", color: "white", border: "none", borderRadius: "8px", padding: "12px", fontSize: "16px", cursor: "pointer", width: "100%" };
const messageStyle = { fontSize: "14px", marginTop: "10px" };
const noticeStyle = { marginTop: "15px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "8px", textAlign: "center", fontSize: "14px" };
const linkStyle = { background: "none", border: "none", color: "#C49E7D", cursor: "pointer", textDecoration: "underline", padding: 0, fontSize: "14px" };
