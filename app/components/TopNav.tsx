import Link from "next/link";

const nav = [
  { name: "Home", href: "/" },
  { name: "Academic", href: "/academic" },
  { name: "Career", href: "/career" },
  { name: "Student Life", href: "/life" },
  { name: "Forum", href: "/forum" },
];

export default function TopNav() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          ColumbusCNLife
        </Link>
        <nav className="flex gap-4 text-sm text-neutral-300">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="hover:text-white transition"
            >
              {i.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
