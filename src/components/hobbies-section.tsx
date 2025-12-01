export default function HobbiesSection() {
  const nowWatching = ["stranger things"];

  const favorites = ["Better Call Saul", "Breaking Bad", "The Office"];

  return (
    <section className="pb-20 text-start">
      <p className="pb-2 text-sm md:text-base">(101)</p>

      <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
        hobbies / personal corner<span className="text-secondary">.</span>
      </h1>

      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-white/80 md:text-xl">
          i'm a cinephile who finds joy in every story
          <span className="text-secondary">.</span> not a critic, just someone
          who loves getting lost in good narratives and appreciating the craft
          behind every frame
          <span className="text-secondary">.</span>
        </p>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex-1">
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition-all duration-300 hover:border-white/20">
              <h3 className="text-secondary mb-4 text-lg font-semibold">
                now watching<span className="text-secondary">.</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {nowWatching.map((title, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm transition-colors hover:bg-white/20"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition-all duration-300 hover:border-white/20">
              <h3 className="text-secondary mb-4 text-lg font-semibold">
                favorites<span className="text-secondary">.</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {favorites.map((title, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm transition-colors hover:bg-white/20"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
