export default function TravelPage() {
    const spots = [
      { name: "Columbus · Short North", note: "餐厅/逛街/夜生活集中" },
      { name: "Columbus · Scioto Mile", note: "河边散步 + 夜景" },
      { name: "Ohio · Hocking Hills", note: "经典一日游/周末游" },
      { name: "Ohio · Cedar Point", note: "夏天游乐园（远一点）" },
    ];
  
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {spots.map((s) => (
          <div key={s.name} className="rounded-2xl bg-white/10 border border-white/10 p-5">
            <div className="text-white text-lg font-semibold">{s.name}</div>
            <div className="text-white/70 text-sm mt-2">{s.note}</div>
          </div>
        ))}
      </div>
    );
  }
  