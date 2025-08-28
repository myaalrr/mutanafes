// pages/admin/orders.js (واجهة React)
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const email = localStorage.getItem("user_email")?.toLowerCase();
        const res = await fetch("/api/admin/orders", {
          headers: { "x-admin-email": email },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "فشل التحميل");
        setOrders(data.orders || []);
      } catch (e) {
        setMsg(e.message);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h1>لوحة الطلبات</h1>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.user_email} — {o.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

