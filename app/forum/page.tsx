export default function ForumPage() {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold">Forum</h1>
        <p className="mt-2 text-neutral-300">
          游客可看；登录后可发帖/评论/点赞（后续加板块、标签、置顶、举报）。
        </p>
  
        <div className="mt-6 rounded-2xl border border-neutral-800 p-6">
          <div className="font-semibold">下一步会做</div>
          <ul className="mt-3 list-disc pl-5 text-neutral-300 space-y-1">
            <li>Post 列表（最新/最热）</li>
            <li>Post 详情（评论）</li>
            <li>发帖按钮（登录可见）</li>
          </ul>
        </div>
      </main>
    );
  }
  