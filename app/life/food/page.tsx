"use client";

import { useMemo, useState } from "react";

type Place = {
  name: string;
  category: "中餐" | "日餐" | "西餐" | "甜品" | "饮品";
  area?: string;
  price?: string;
  note?: string;
  link?: string;
};

const DATA: Place[] = [
  { name: "示例：湘遇东北", category: "中餐", area: "Kenny Center", price: "$$", note: "农家一碗湘不解释", link: "" },
  { name: "示例：Tensuke Ramen", category: "日餐", area: "Kenny Center", price: "$$", note: "天妇罗很好吃", link: "" },
  { name: "示例：甜品店", category: "甜品", area: "Downtown", price: "$$", note: "写你喜欢的甜品", link: "" },
];

const TABS: Place["category"][] = ["中餐", "日餐", "西餐", "甜品", "饮品"];

export default function FoodPage() {
  const [tab, setTab] = useState<Place["category"]>("中餐");

  const list = useMemo(() => DATA.filter((x) => x.category === tab), [tab]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm border transition ${
              tab === t
                ? "bg-[#FFCC00] text-black border-[#FFCC00]"
                : "bg-white/10 text-white/80 border-white/10 hover:bg-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl bg-white/10 border border-white/10 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-white text-lg font-semibold">{p.name}</div>
                <div className="text-white/60 text-sm">
                  {p.area || "—"} · {p.price || "—"}
                </div>
              </div>
              <span className="text-xs rounded-full px-2 py-1 bg-white/10 text-white/70">
                {p.category}
              </span>
            </div>
            {p.note && <div className="text-white/80 text-sm mt-3">{p.note}</div>}
            {p.link && (
              <a className="text-[#00D4FF] text-sm mt-3 inline-block" href={p.link} target="_blank">
                打开链接
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="text-white/60 text-sm">
        注：你说“参考 yelp”，我们后面可以做成你手动录入 + 外链到 Yelp（别直接搬运 Yelp 文案/图片）。
      </div>
    </div>
  );
}
