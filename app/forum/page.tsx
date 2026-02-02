import Link from "next/link";
import { supabaseServer } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

const POSTS_TABLE = "forum_posts";
const PROFILES_TABLE = "profiles";
const CATEGORIES_TABLE = "forum_categories";

export default async function ForumPage() {
  const supabase = await supabaseServer();

  // ✅ 只选存在的列：id/category_id/author_id/title/content/created_at
  const { data: posts, error } = await supabase
    .from(POSTS_TABLE)
    .select("id,title,content,created_at,author_id,category_id")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10 text-white">
        <div className="rounded-xl bg-red-500/15 p-4 text-red-200">
          读取帖子失败：{error.message}
        </div>
      </main>
    );
  }

  const list = posts ?? [];

  // 批量读作者 & 分类（可选，失败也不影响主功能）
  const authorIds = Array.from(new Set(list.map((p: any) => p.author_id).filter(Boolean)));
  const categoryIds = Array.from(new Set(list.map((p: any) => p.category_id).filter(Boolean)));

  const [{ data: authors }, { data: categories }] = await Promise.all([
    authorIds.length
      ? supabase.from(PROFILES_TABLE).select("id,display_name").in("id", authorIds)
      : Promise.resolve({ data: [] as any[] }),
    categoryIds.length
      ? supabase.from(CATEGORIES_TABLE).select("id,name").in("id", categoryIds)
      : Promise.resolve({ data: [] as any[] }),
  ]);

  const authorMap = new Map((authors ?? []).map((a: any) => [a.id, a.display_name ?? "匿名"]));
  const categoryMap = new Map((categories ?? []).map((c: any) => [c.id, c.name ?? "未分类"]));

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">论坛</h1>
        <Link
          href="/forum/new"
          className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-black hover:bg-white"
        >
          + 新发帖
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {list.length === 0 ? (
          <div className="text-neutral-300">还没有帖子。</div>
        ) : (
          list.map((p: any) => {
            if (!p?.id) {
              return (
                <div
                  key={Math.random()}
                  className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5"
                >
                  <div className="text-sm text-red-200">
                    ⚠️ 这条记录缺少 id（会导致 /forum/undefined）
                  </div>
                  <pre className="mt-3 overflow-auto rounded-xl bg-black/40 p-3 text-xs text-red-100">
                    {JSON.stringify(p, null, 2)}
                  </pre>
                </div>
              );
            }

            const href = `/forum/${encodeURIComponent(String(p.id))}`;
            const authorName = authorMap.get(p.author_id) ?? "匿名";
            const catName = categoryMap.get(p.category_id) ?? "未分类";
            const time = p.created_at ? new Date(p.created_at).toLocaleString("zh-CN") : "";

            return (
              <Link
                key={String(p.id)}
                href={href}
                className="block rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
              >
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-neutral-300">
                  <span className="mr-3">作者：{authorName}</span>
                  <span className="mr-3">分类：{catName}</span>
                  <span>时间：{time}</span>
                </div>
                <div className="mt-3 line-clamp-2 text-sm text-neutral-200">
                  {p.content}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
