import Link from "next/link";

const sections = [
  {
    title: "Academic Track",
    desc: "教授/课程评价 · 水课/好课推荐 · 选课避坑",
    href: "/academic",
  },
  {
    title: "Career Planning",
    desc: "实习机会 · 招聘资讯 · 简历/面经分享（后续可做）",
    href: "/career",
  },
  {
    title: "Student Life",
    desc: "吃喝玩乐 · 本地生活 · Columbus 周边旅行",
    href: "/life",
  },
  {
    title: "Forum",
    desc: "自由发帖讨论 · 点赞评论 · 校内互助",
    href: "/forum",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">ColumbusCNLife</h1>
        <p className="mt-3 text-lg text-neutral-300">
          面向 OSU 在校学生（尤其华人）的生活通：选课、实习、吃喝玩乐、论坛讨论。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-6 hover:bg-neutral-900/40 transition"
          >
            <div className="text-xl font-semibold">{s.title}</div>
            <div className="mt-2 text-neutral-300">{s.desc}</div>
            <div className="mt-4 text-sm text-neutral-400">进入 →</div>
          </Link>
        ))}
      </section>

      <footer className="mt-12 text-sm text-neutral-500">
        游客可浏览；登录（邮箱）后才能发帖/评分。后续会加搜索、筛选、举报、管理员审核。
      </footer>
    </main>
  );
}
