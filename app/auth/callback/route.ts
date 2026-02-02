import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // 你也可以支持 ?next=/forum/new 这种跳回逻辑
  const next = url.searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await supabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, url.origin));
}