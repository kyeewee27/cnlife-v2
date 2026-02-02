export default function NewsPage() {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
          <div className="text-white text-lg font-semibold">美国时事新闻</div>
          <div className="text-white/70 text-sm mt-2">
          </div>
        </div>
  
        <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
          <div className="text-white text-lg font-semibold">Columbus 本地新闻</div>
          <div className="text-white/70 text-sm mt-2">
          </div>
        </div>
      </div>
    );
  }
  