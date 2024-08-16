"use client";

import { apiUrl } from "@/config/urls";
import { useEffect, useRef } from "react";

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window || !codeInputRef?.current || !formRef.current) return;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code") ?? "";
    codeInputRef.current.value = code;
    formRef.current.submit();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Logged in</p>

      <form action={`${apiUrl}/code`} method="post" ref={formRef}>
        <input type="text" name="code" id="code" required ref={codeInputRef} />
        <input type="submit" />
      </form>
    </main>
  );
}
