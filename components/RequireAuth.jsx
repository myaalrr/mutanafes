import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RequireAuth({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isLogged = typeof window !== "undefined" ? localStorage.getItem("logged_in") : null;
    if (isLogged !== "1") router.replace("/login");
  }, [router]);

  return <>{children}</>;
}
