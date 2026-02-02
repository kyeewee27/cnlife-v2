"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/app/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [msg, setMsg] = useState("");

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMsg("");

    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // 关键：让 link 回到你的网站 callback
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          // 你要“暂不限制 OSU 邮箱”，这里保持默认 true（自动创建用户）
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setStatus("sent");
      setMsg("✅ 已发送登录链接（Magic Link），去邮箱点一下即可登录（如果没收到记得查看垃圾邮件）。");
    } catch (err: any) {
      setStatus("error");
      setMsg(err?.message ?? "发送失败");
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-2xl font-bold text-white">登录 / 注册</h1>
      <p className="mt-2 text-sm text-neutral-300">
        输入邮箱，我们会发一封 Magic Link。点邮件里的链接即可登录。
      </p>

      <form onSubmit={sendLink} className="mt-6 space-y-3">
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-xl bg-white/90 px-4 py-3 font-semibold text-black disabled:opacity-60"
        >
          {status === "sending" ? "发送中..." : "发送登录链接"}
        </button>

        {msg ? (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              status === "error"
                ? "bg-red-500/15 text-red-200"
                : "bg-emerald-500/15 text-emerald-200"
            }`}
          >
            {msg}
          </div>
        ) : null}
      </form>
    </main>
  );
}