/*my-website > pages > signup.jsx */
"use client";
import { useState } from "react";
import { auth, db, RecaptchaVerifier } from "../firebase";
import { signInWithPhoneNumber } from "firebase/auth";
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
  const [accountExists, setAccountExists] = useState(false);

  const sendOtp = async () => {
    try {
      if (!name) {
        setMessageType("error");
        setMessage("يرجى إدخال الاسم ❌");
        return;
      }

      if (!phone.match(/^05\d{8}$/)) {
        setMessageType("error");
        setMessage("يرجى إدخال رقم هاتف صحيح ❌");
        return;
      }

      const formattedPhone = "+966" + phone.slice(1);

      // التحقق إذا الحساب موجود مسبقًا
      const snapshot = await get(ref(db, `users/${formattedPhone}/name`));
      if (snapshot.exists()) {
        setAccountExists(true);
        setMessageType("info");
        setMessage("الحساب موجود مسبقًا");
        return;
      }

      // تهيئة reCAPTCHA invisible
    if (!window.recaptchaVerifier) {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA verified:", response);
      }
    },
    auth
  );
}

      // إرسال OTP
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      setConfirmation(confirmationResult);
      setMessageType("success");
      setMessage("تم إرسال رمز التحقق ✅");

    } catch (err) {
      console.error("Error sending OTP:", err);
      setMessageType("error");
      setMessage("حدث خطأ في إرسال الرمز. تحقق من الرقم أو الاتصال بالإنترنت");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmation.confirm(otp);
      const user = result.user;

      await set(ref(db, `users/${user.phoneNumber}/name`), name);

      setMessageType("success");
      setMessage("تم إنشاء الحساب وتسجيل الدخول بنجاح ✅");

      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error("Error verifying OTP:", err);
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

      {message && (
        <p style={{ ...messageStyle, color: messageType === "success" ? "#637e64ff" : "#C49E7D" }}>{message}</p>
      )}

      {accountExists && (
        <div style={noticeStyle}>
          الحساب موجود مسبقًا،{" "}
          <button style={linkStyle} onClick={() => router.push("/login")}>سجل دخولك من هنا</button>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}

// 🎨 تنسيقات
const containerStyle = { maxWidth: 400, margin: "50px auto", padding: 20, fontFamily: "IBMPlexArabic" };
const titleStyle = { textAlign: "center", marginBottom: 20 };
const inputStyle = { padding: "12px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #f5f5f5", fontSize: "16px", width: "100%", boxSizing: "border-box" };
const buttonStyle = { backgroundColor: "#C49E7D", color: "white", border: "none", borderRadius: "8px", padding: "12px", fontSize: "16px", cursor: "pointer", width: "100%" };
const messageStyle = { fontSize: "14px", marginTop: "10px" };
const noticeStyle = { marginTop: "15px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "8px", textAlign: "center", fontSize: "14px" };
const linkStyle = { background: "none", border: "none", color: "#C49E7D", cursor: "pointer", textDecoration: "underline", padding: 0, fontSize: "14px" };
