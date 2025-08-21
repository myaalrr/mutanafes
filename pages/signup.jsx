/*my-website > pages > signup.jsx */
"use client";
import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const sendOtp = async () => {
    try {
      if (!name || !phone) {
        setMessageType("error");
        setMessage("يرجى إدخال الاسم والرقم ❌");
        return;
      }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
      }

      const formattedPhone = phone.startsWith("0") ? "+966" + phone.slice(1) : "+966" + phone;

      // تحقق إذا الحساب موجود مسبقًا
      const snapshot = await get(ref(db, `users/${formattedPhone}/name`));
      if (snapshot.exists()) {
        setMessageType("error");
        setMessage("الحساب موجود مسبقًا، يرجى تسجيل الدخول ❌");
        return;
      }

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      setMessageType("success");
      setMessage("تم إرسال رمز التحقق ✅");
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("خطأ في إرسال الرمز ❌");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmation.confirm(otp);
      const user = result.user;

      await set(ref(db, `users/${user.phoneNumber}/name`), name);

      setMessageType("success");
      setMessage(`تم إنشاء الحساب وتسجيل الدخول بنجاح ✅`);

      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("رمز التحقق غير صحيح ❌");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>إنشاء حساب</h2>

      <input type="text" placeholder="الاسم الكامل" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
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

      <div id="recaptcha-container"></div>
    </div>
  );
}

const containerStyle = { maxWidth: 400, margin: "50px auto", padding: 20, fontFamily: "IBMPlexArabic" };
const titleStyle = { textAlign: "center", marginBottom: 20 };
const inputStyle = { padding: "12px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #f5f5f5", fontSize: "16px", width: "100%", boxSizing: "border-box" };
const buttonStyle = { backgroundColor: "#C49E7D", color: "white", border: "none", borderRadius: "8px", padding: "12px", fontSize: "16px", cursor: "pointer", width: "100%" };
const messageStyle = { fontSize: "14px", marginTop: "10px" };
