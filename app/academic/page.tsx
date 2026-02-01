export default function AcademicPage() {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold">Academic Track</h1>
        <p className="mt-2 text-neutral-300">
          这里会做成“点评/Yelp”样式：课程/教授列表 → 详情页 → 评分/评论（登录后）。
        </p>
  
        <div className="mt-6 rounded-2xl border border-neutral-800 p-6">
          <div className="font-semibold">下一步（你马上要做的）</div>
          <ol className="mt-3 list-decimal pl-5 text-neutral-300 space-y-1">
            <li>建立 Course / Professor / Review 三张表</li>
            <li>做列表页：搜索、筛选（学院/难度/给分）</li>
            <li>做详情页：评分、评论、匿名规则、举报</li>
          </ol>
        </div>
      </main>
    );
  }
  