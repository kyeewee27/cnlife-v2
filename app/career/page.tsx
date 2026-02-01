export default function CareerPage() {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold">Career Planning</h1>
        <p className="mt-2 text-neutral-300">
          实习机会推广 + 资讯流（后续可加订阅、标签、收藏）。
        </p>
  
        <div className="mt-6 rounded-2xl border border-neutral-800 p-6">
          <div className="font-semibold">MVP 结构建议</div>
          <ul className="mt-3 list-disc pl-5 text-neutral-300 space-y-1">
            <li>Internship（岗位）列表/详情</li>
            <li>News（资讯）列表/详情</li>
            <li>登录后可以投稿/分享（可选：先只管理员发布）</li>
          </ul>
        </div>
      </main>
    );
  }
  