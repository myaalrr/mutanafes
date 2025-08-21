/*my-website > pages > login.jsx */
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
  const [accountNotFound, setAccountNotFound] = useState(false);

  const initRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear(); // مسح أي reCAPTCHA قديمة
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  const sendOtp = async () => {
    try {
      if (!phone.match(/^05\d{8}$/)) {
        setMessageType("error");
        setMessage("يرجى إدخال رقم هاتف صحيح ❌");
        return;
      }

      const formattedPhone = "+966" + phone.slice(1);
      const snapshot = await get(ref(db, `users/${formattedPhone}/name`));

      if (!snapshot.exists()) {
        setAccountNotFound(true);
        setMessage("");
        return;
      }

      initRecaptcha(); // إعادة تهيئة reCAPTCHA قبل كل محاولة
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );
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
      const user = result.user;
      const snapshot = await get(ref(db, `users/${user.phoneNumber}/name`));
      const userName = snapshot.exists() ? snapshot.val() : "مستخدم";

      setMessageType("success");
      setMessage(`مرحباً ${userName}, تم تسجيل الدخول بنجاح ✅`);
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

      <input
        type="tel"
        placeholder="05XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={inputStyle}
      />

      {!confirmation ? (
        <button style={buttonStyle} onClick={sendOtp}>
          إرسال الرمز
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="أدخل الرمز"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={inputStyle}
          />
          <button style={buttonStyle} onClick={verifyOtp}>
            تأكيد الرمز
          </button>
        </>
      )}

      {message && (
        <p
          style={{
            ...messageStyle,
            color: messageType === "success" ? "#637e64ff" : "#C49E7D",
          }}
        >
          {message}
        </p>
      )}

      {accountNotFound && (
        <div style={noticeStyle}>
          الحساب غير موجود،{" "}
          <button style={linkStyle} onClick={() => router.push("/signup")}>
            أنشئ حسابك من هنا
          </button>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}

// ... (styles كما هي بدون تغيير)

const containerStyle = {
  maxWidth: 400,
  margin: "50px auto",
  padding: 20,
  fontFamily: "IBMPlexArabic",
};
const titleStyle = { textAlign: "center", marginBottom: 20 };
const inputStyle = {
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #f5f5f5",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
};
const buttonStyle = {
  backgroundColor: "#C49E7D",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px",
  fontSize: "16px",
  cursor: "pointer",
  width: "100%",
};
const messageStyle = { fontSize: "14px", marginTop: "10px" };
const noticeStyle = {
  marginTop: "15px",
  padding: "10px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  textAlign: "center",
  fontSize: "14px",
};
const linkStyle = {
  background: "none",
  border: "none",
  color: "#C49E7D",
  cursor: "pointer",
  textDecoration: "underline",
  padding: 0,
  fontSize: "14px",
};
