export default function LifePage() {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold">Student Life</h1>
        <p className="mt-2 text-neutral-300">
          做成“吃喝玩乐点评”+“本地信息流”：餐厅/景点/服务 → 点评；以及本地新闻/通知。
        </p>
  
        <div className="mt-6 rounded-2xl border border-neutral-800 p-6">
          <div className="font-semibold">MVP 结构建议</div>
          <ul className="mt-3 list-disc pl-5 text-neutral-300 space-y-1">
            <li>Places（餐厅/奶茶/理发/修车/景点）列表/详情/评分</li>
            <li>Guides（攻略）列表/详情（比如“Columbus 周末去哪”）</li>
          </ul>
        </div>
      </main>
    );
  }
  