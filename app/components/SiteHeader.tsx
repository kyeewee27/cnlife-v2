import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import AuthButton from "./AuthButton";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/icon.svg" alt="CNLife" className="h-9 w-9" />
          <div className="leading-tight">
            <div className="text-white font-semibold tracking-tight">
              Columbus CNLife
            </div>
            <div className="text-white/70 text-xs">
              OSU 华人生活通 · 选课 · 生活 · 社区
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className="text-white/80 hover:text-white" href="/academic">
            Academic
          </Link>
          <Link className="text-white/80 hover:text-white" href="/career">
            Career
          </Link>
          <Link className="text-white/80 hover:text-white" href="/life">
            Student Life
          </Link>
          <Link className="text-white/80 hover:text-white" href="/forum">
            Forum
          </Link>
        </nav>

        <AuthButton email={user?.email ?? null} />
      </div>

      <div className="h-px w-full bg-white/10" />
    </header>
  );
}
