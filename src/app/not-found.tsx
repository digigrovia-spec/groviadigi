import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper grain">
      <div className="text-center">
        <p className="font-mono-tag text-ink-muted mb-6 reveal">[ 404 — Lost ]</p>
        <h1 className="font-display text-8xl md:text-[12rem] leading-none tracking-tight text-ink mb-4">
          404<span className="text-bright">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-ink-soft mb-10 max-w-md mx-auto leading-relaxed">
          This page doesn't exist — but the studio does.
        </p>
        <Link
          href="/"
          className="pill-cta text-base inline-flex"
        >
          Return home
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
