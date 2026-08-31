const favorites = ["Better Call Saul", "Breaking Bad", "The Office"];

function FilmPerforations() {
  return (
    <span
      aria-hidden
      className="block h-2 w-full opacity-70"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, white 0 18px, transparent 18px 36px)",
      }}
    />
  );
}

/** Typographic film leader built from the viewing preferences already in-repo. */
export default function ScreeningRoomSection() {
  return (
    <section className="pb-40 text-start">
      <p className="font-display pb-2 text-lg md:text-xl">(100)</p>

      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        screening room<span className="text-secondary">.</span>
      </h1>

      <div className="mt-10 border-y border-white/20 py-2">
        <FilmPerforations />

        <div className="px-1 py-6 sm:px-3 sm:py-8">
          <div className="flex items-center justify-between gap-4 text-[10px] font-medium tracking-[0.18em] text-white/45 uppercase sm:text-xs">
            <span>now screening / 01</span>
            <span>no spoilers</span>
          </div>

          <p className="font-display pt-8 text-[clamp(3.5rem,9vw,8rem)] leading-[0.78] font-medium tracking-[-0.055em] uppercase">
            Stranger
            <br />
            Things
          </p>

          <div className="mt-8 grid border-t border-white/15 sm:grid-cols-3">
            {favorites.map((title, index) => (
              <div
                key={title}
                className="group/frame border-b border-white/15 px-1 py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:px-4 sm:last:border-r-0"
              >
                <p className="text-secondary text-[10px] font-medium tracking-[0.08em] uppercase sm:text-xs">
                  favorite / {String(index + 1).padStart(3, "0")}
                </p>
                <h2 className="font-display group-hover/frame:text-secondary pt-4 text-xl leading-none font-semibold transition-colors duration-200 motion-reduce:transition-none sm:text-2xl">
                  {title}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <FilmPerforations />
      </div>
    </section>
  );
}
