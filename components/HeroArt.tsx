const swatches = ["#f5643c", "#f8845f", "#f2a63d", "#f6c65a", "#fbf1e8"];

export default function HeroArt() {
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-sm sm:h-[420px] sm:max-w-md">
      {/* ambient blobs */}
      <div
        className="blob left-[-10%] top-[-6%] h-56 w-56"
        style={{ background: "rgb(37 99 235 / 0.28)" }}
      />
      <div
        className="blob bottom-[-8%] right-[-6%] h-48 w-48"
        style={{ background: "rgb(242 166 61 / 0.32)", animationDelay: "-8s" }}
      />

      {/* Gradient card — back, top-right */}
      <div
        className="float-bob absolute right-0 top-0 w-44 rounded-3xl border border-line bg-surface p-3 shadow-[0_20px_45px_-24px_rgb(106_87_232_/_0.4)] sm:w-56"
        style={{ ["--tilt" as string]: "5deg", ["--delay" as string]: "-2s" }}
      >
        <div
          className="gradient-live h-20 w-full rounded-2xl sm:h-28"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #f5643c 0%, #f2853f 45%, #f6c65a 100%)",
          }}
        />
        <p className="mt-2.5 px-1 text-xs font-medium text-muted">Gradient</p>
      </div>

      {/* Shadow card — back, bottom-left */}
      <div
        className="float-bob absolute bottom-0 left-0 w-40 rounded-3xl border border-line bg-surface p-4 shadow-[0_20px_45px_-24px_rgb(0_0_0_/_0.3)] sm:w-52"
        style={{ ["--tilt" as string]: "-3deg", ["--delay" as string]: "-5s" }}
      >
        <div className="grid h-16 place-items-center rounded-2xl bg-surface-2 sm:h-24">
          <div className="h-9 w-20 rounded-xl bg-surface shadow-[0_12px_24px_-6px_rgb(37_99_235_/_0.3)] sm:h-12 sm:w-28" />
        </div>
        <p className="mt-2.5 px-1 text-xs font-medium text-muted">Shadow</p>
      </div>

      {/* Palette card — front, center */}
      <div
        className="float-bob absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-line bg-surface p-4 shadow-[0_28px_55px_-24px_rgb(17_24_39_/_0.25)] sm:w-64"
        style={{ ["--tilt" as string]: "-1.5deg" }}
      >
        <div className="flex items-center justify-between px-1 pb-3">
          <span className="text-sm font-semibold">Palette</span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
            space ↻
          </span>
        </div>
        <div className="flex gap-1.5">
          {swatches.map((c) => (
            <div key={c} className="flex-1">
              <div
                className="h-16 rounded-lg border border-line/60 sm:h-24 sm:rounded-xl"
                style={{ backgroundColor: c }}
              />
              <p className="mt-1.5 hidden text-center font-mono text-[9px] text-muted sm:block">
                {c.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
