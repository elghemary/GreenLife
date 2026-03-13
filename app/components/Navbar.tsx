"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const links = [
    { label: "الحل", href: "/about" },
    { label: "المنهجية", href: "/approach" },
    { label: "الأسعار", href: "/pricing" },
    { label: "الفريق", href: "/team" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  return (
    <nav style={{
      position: isHome ? "fixed" : "sticky",
      top: 0, left: 0, right: 0, zIndex: 100,
      background: isHome && !scrolled ? "transparent" : "rgba(8,15,9,0.95)",
      backdropFilter: isHome && !scrolled ? "none" : "blur(12px)",
      borderBottom: isHome && !scrolled ? "none" : "1px solid rgba(61,158,102,0.15)",
      padding: "18px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.3s ease",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <span style={{ fontSize: "24px" }}>🌾</span>
        <span style={{ fontFamily: "'Amiri', serif", fontSize: "20px", color: "#f0e6d0", fontWeight: "700" }}>GreenLife</span>
      </Link>

      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {links.map((item) => (
          <Link key={item.href} href={item.href} style={{
            color: pathname === item.href ? "#3d9e66" : "#9ab89a",
            fontSize: "14px", textDecoration: "none",
            borderBottom: pathname === item.href ? "1px solid #3d9e66" : "1px solid transparent",
            paddingBottom: "2px",
            transition: "color 0.2s",
          }}>
            {item.label}
          </Link>
        ))}
        <Link href="/login" style={{
          background: "#3d9e66", color: "#fff",
          padding: "8px 20px", borderRadius: "8px",
          fontSize: "14px", textDecoration: "none", fontWeight: "700",
        }}>
          دخول
        </Link>
      </div>
    </nav>
  );
}