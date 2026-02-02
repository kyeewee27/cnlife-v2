import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

const POSTS_TABLE = "forum_posts";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  async function createPost(formData: FormData) {
    "use server";

    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();
    const categoryIdRaw = String(formData.get("category_id") ?? "1").trim();
    const category_id = Number.isFinite(Number(categoryIdRaw)) ? Number(categoryIdRaw) : 1;

    if (!title || !content) {
      redirect(`/forum/new?error=${encodeURIComponent("标题和内容不能为空")}`);
    }

    const supabase = await supabaseServer();

    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userRes?.user) {
      redirect(`/login`);
    }

    const author_id = userRes.user.id;

    // ✅ insert 后立刻 select("id")，保证拿到 UUID
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .insert({ title, content, category_id, author_id })
      .select("id")
      .single();

    if (error || !data?.id) {
      redirect(`/forum/new?error=${encodeURIComponent(error?.message || "创建失败：未返回 id")}`);
    }

    redirect(`/forum/${encodeURIComponent(String(data.id))}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-white">
      <div className="mb-6">
        <Link className="text-sm underline text-neutral-200" href="/forum">
          ← 返回列表
        </Link>
      </div>

      <h1 className="text-2xl font-bold">新发帖</h1>

      {searchParams?.error ? (
        <div className="mt-4 rounded-xl bg-red-500/15 p-4 text-red-200">
          {decodeURIComponent(searchParams.error)}
        </div>
      ) : null}

      <form action={createPost} className="mt-6 space-y-4">
        <div>
          <div className="mb-2 text-sm text-neutral-200">标题</div>
          <input
            name="title"
            className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none"
            placeholder="输入标题"
            required
          />
        </div>

        <div>
          <div className="mb-2 text-sm text-neutral-200">分类（默认 1）</div>
          <input
            name="category_id"
            defaultValue="1"
            className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <div className="mb-2 text-sm text-neutral-200">内容</div>
          <textarea
            name="content"
            className="min-h-[220px] w-full rounded-xl bg-white/10 px-4 py-3 outline-none"
            placeholder="输入内容"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-white/90 px-5 py-3 text-sm font-semibold text-black hover:bg-white"
        >
          发布
        </button>
      </form>
    </main>
  );
}
