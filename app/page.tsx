import Link from "next/link";

type Section = {
  title: string;
  desc: string;
  href: string;
  color: "cyan" | "red" | "yellow" | "purple";
};

const sections: Section[] = [
  {
    title: "Academic Track",
    desc: "教授/课程评分 · 水课/好课推荐 · 选课避坑",
    href: "/academic",
    color: "cyan",
  },
  {
    title: "Career Planning",
    desc: "实习机会推广 · 招聘资讯 · 简历/面经（后续做）",
    href: "/career",
    color: "yellow",
  },
  {
    title: "Student Life",
    desc: "吃喝玩乐点评 · 本地生活 · Columbus 周边旅行",
    href: "/life",
    color: "red",
  },
  {
    title: "Forum",
    desc: "自由发帖讨论 · 评论互动（游客可看，登录可发）",
    href: "/forum",
    color: "purple",
  },
];

function colorClass(c: Section["color"]) {
  switch (c) {
    case "cyan":
      return {
        text: "text-cyan-300",
        border: "border-cyan-500/50",
        hover: "hover:bg-cyan-500/10 hover:border-cyan-400/70",
        dot: "bg-cyan-400",
      };
    case "red":
      return {
        text: "text-red-400",
        border: "border-red-500/50",
        hover: "hover:bg-red-500/10 hover:border-red-400/70",
        dot: "bg-red-400",
      };
    case "yellow":
      return {
        text: "text-amber-300",
        border: "border-amber-500/50",
        hover: "hover:bg-amber-500/10 hover:border-amber-400/70",
        dot: "bg-amber-300",
      };
    case "purple":
    default:
      return {
        text: "text-violet-300",
        border: "border-violet-500/50",
        hover: "hover:bg-violet-500/10 hover:border-violet-400/70",
        dot: "bg-violet-300",
      };
  }
}

export default function HomePage() {
  return (
    <main
      className="min-h-[calc(100vh-64px)]"
      style={{
        // ✅ 你只要替换 public/home-bg.jpg 这张图就行
        backgroundImage: "url('/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 暗色遮罩，让字更清楚 */}
      <div className="min-h-[calc(100vh-64px)] bg-black/30">
        {/* 轻微渐变：上面更暗，下面稍亮 */}
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-black/20 via-black/25 to-black/35">
          <div className="mx-auto max-w-5xl px-6 py-14">
            {/* 标题区（参考你图里的排版：大标题） */}
            <div className="max-w-2xl">
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.95] text-white">
                Columbus
                <br />
                CNLife
              </h1>
              <p className="mt-5 text-neutral-200/90 text-base sm:text-lg leading-relaxed">
                面向 OSU 在校学生（主要华人）的生活通：选课、实习、吃喝玩乐、论坛交流。
              </p>

              <div className="mt-4 text-sm text-neutral-300/80">
                规则：游客可浏览；邮箱登录后才能发帖/评分（后面接 Supabase）。
              </div>
            </div>

            {/* 彩色板块按钮区（像你图里那种彩色条目） */}
            <section className="mt-10 grid gap-4">
              {sections.map((s, idx) => {
                const cls = colorClass(s.color);
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={[
                      "group rounded-2xl border bg-neutral-950/35 backdrop-blur-md",
                      "px-6 py-5 transition",
                      cls.border,
                      cls.hover,
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-4">
                      {/* 左边小圆点 */}
                      <div className="pt-2">
                        <div className={`h-3 w-3 rounded-full ${cls.dot}`} />
                      </div>

                      <div className="flex-1">
                        <div className={`text-xl sm:text-2xl font-extrabold ${cls.text}`}>
                          {idx + 1}. {s.title}
                        </div>
                        <div className="mt-2 text-neutral-200/80">{s.desc}</div>
                      </div>

                      <div className="text-neutral-300/70 group-hover:text-white transition">
                        →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </section>

            {/* 底部小字 */}
            <div className="mt-10 text-xs text-neutral-300/60">
              Tip：现在先把界面搭出来，下一步我们再把每个板块做成“点评式列表 → 详情 → 登录后发布”。
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
