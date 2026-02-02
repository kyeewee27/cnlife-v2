"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { id: string; text: string; done: boolean; group: string };

const DEFAULT: Item[] = [
  { id: "i20", group: "出发前", text: "确认 I-20 / 签证 / 疫苗", done: false },
  { id: "housing", group: "出发前", text: "搞定住宿（宿舍/公寓/短租）", done: false },
  { id: "phone", group: "到达后 48h", text: "办手机卡/网络", done: false },
  { id: "bank", group: "到达后 1 周", text: "开银行账户 + 了解信用卡", done: false },
  { id: "osu-id", group: "到达后 48h", text: "办 BuckID / 校园权限", done: false },
  { id: "clinic", group: "到达后 1 周", text: "了解学校医疗资源/保险", done: false },
  { id: "grocery", group: "生活", text: "熟悉买菜渠道（Kroger / 亚洲超市等）", done: false },
  { id: "transport", group: "生活", text: "熟悉交通（COTA / 校园巴士 / Uber）", done: false },
];

const KEY = "cnlife_checklist_v1";

export default function ChecklistPage() {
  const [items, setItems] = useState<Item[]>(DEFAULT);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const doneCount = useMemo(() => items.filter((x) => x.done).length, [items]);
  const pct = Math.round((doneCount / items.length) * 100);

  const groups = useMemo(() => {
    const m = new Map<string, Item[]>();
    for (const it of items) {
      m.set(it.group, [...(m.get(it.group) || []), it]);
    }
    return Array.from(m.entries());
  }, [items]);

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, done: !x.done } : x))
    );
  }

  function reset() {
    setItems(DEFAULT);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-white font-medium">进度：{pct}%</div>
          <button
            onClick={reset}
            className="text-sm text-white/80 hover:text-white underline"
          >
            重置
          </button>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-[#00D4FF]" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-white/70 text-sm mt-2">
          已完成 {doneCount}/{items.length}
        </div>
      </div>

      {groups.map(([g, list]) => (
        <div key={g} className="rounded-2xl bg-white/10 border border-white/10">
          <div className="px-5 py-4 text-white font-semibold">{g}</div>
          <div className="px-3 pb-4">
            {list.map((it) => (
              <button
                key={it.id}
                onClick={() => toggle(it.id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition text-left"
              >
                <span
                  className={`h-5 w-5 rounded-md border ${
                    it.done
                      ? "bg-[#00D4FF] border-[#00D4FF]"
                      : "border-white/30"
                  }`}
                />
                <span className={it.done ? "text-white/60 line-through" : "text-white"}>
                  {it.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
