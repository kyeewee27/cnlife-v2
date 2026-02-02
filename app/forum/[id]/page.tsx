import Link from "next/link";
import { supabaseServer } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

const POSTS_TABLE = "forum_posts";

export default async function ForumPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;

  if (!id) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10 text-white">
        <div className="rounded-xl bg-red-500/15 p-4 text-red-200">
          帖子链接不正确：缺少 id（当前 id: {String(id)}）
        </div>
        <div className="mt-4 text-sm text-neutral-300">
          你应该访问：/forum/&lt;uuid&gt;
        </div>
      </main>
    );
  }

  const supabase = await supabaseServer();

  const { data: post, error } = await supabase
    .from(POSTS_TABLE)
    .select("id,title,content,created_at,author_id,category_id")
    .eq("id", id)
    .single();

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10 text-white">
        <div className="rounded-xl bg-red-500/15 p-4 text-red-200">
          读取帖子失败：{error.message}
        </div>
        <div className="mt-6">
          <Link className="text-sm underline text-neutral-200" href="/forum">
            ← 返回列表
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-white">
      <div className="mb-6">
        <Link className="text-sm underline text-neutral-200" href="/forum">
          ← 返回列表
        </Link>
      </div>

      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="mt-2 text-xs text-neutral-400">
        {post.created_at ? new Date(post.created_at).toLocaleString("zh-CN") : ""}
      </div>

      <div className="mt-6 whitespace-pre-wrap text-neutral-100">
        {post.content}
      </div>
    </main>
  );
}
