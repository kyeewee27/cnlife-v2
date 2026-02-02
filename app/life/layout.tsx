import Link from "next/link";

const tabs = [
  { href: "/life/checklist", label: "入学准备 Checklist" },
  { href: "/life/food", label: "吃喝榜" },
  { href: "/life/travel", label: "旅行日记" },
  { href: "/life/news", label: "社会新闻" },
];

export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-white text-3xl font-semibold mb-3">Student Life</h1>
      <p className="text-white/70 mb-6">
        本地生活信息入口：入学准备、吃喝榜、旅行日记、社会新闻。
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-full px-4 py-2 text-sm bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition"
          >
            {t.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
