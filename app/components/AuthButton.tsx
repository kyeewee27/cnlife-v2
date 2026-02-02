"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export default function AuthButton({ email }: { email: string | null }) {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    const supabase = await createClient();
    await supabase.auth.signOut();
    setLoading(false);
    location.href = "/";
  }

  if (!email) {
    return (
      <a
        href="/login"
        className="rounded-full px-4 py-2 text-sm font-medium bg-white/15 text-white hover:bg-white/25 transition"
      >
        Log in
      </a>
    );
  }

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="rounded-full px-4 py-2 text-sm font-medium bg-white text-black hover:opacity-90 disabled:opacity-60"
      title={email}
    >
      {loading ? "..." : "Log out"}
    </button>
  );
}
