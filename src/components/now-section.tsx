export default function NowSection() {
  const currentFocus = [
    {
      category: "building",
      items: [
        "working on freelance projects",
        "developing v2 of pdx – aiming to make it an all-in-one ai-powered study app, including gamified group study sessions",
      ],
    },
    {
      category: "learning",
      items: [
        "rag and chunking techniques, exploring their different forms and understanding which works best in various scenarios",
        "python for production and its various nuances",
        "internals of how web2 works – discovering new aspects of caching and related topics every day",
        "learning new animations daily – passionate about microanimations and often pick up ideas from different sites and tutorials",
      ],
    },
    {
      category: "exploring",
      items: [
        "diving into web3, aiming to break into the space",
        "brainstorming small ai utilities that can be built and sold",
        "performance optimization techniques for large-scale applications",
      ],
    },
  ];

  return (
    <section className="pb-20 text-start">
      <p className="pb-2 text-sm md:text-base">(011)</p>

      <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
        now<span className="text-secondary">.</span>
      </h1>

      <div className="space-y-8 pt-10">
        {currentFocus.map((focus, index) => (
          <div key={index} className="group">
            <div className="mb-4 flex flex-col gap-2">
              <h3 className="group-hover:text-secondary text-xl font-semibold transition-colors md:text-2xl">
                {focus.category}
                <span className="text-secondary">.</span>
              </h3>
            </div>

            <ul className="space-y-2">
              {focus.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="text-secondary mt-1.5 text-sm">•</span>
                  <span className="text-base leading-relaxed md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-white/10 pt-6">
        <p className="text-sm text-white/60">
          last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </section>
  );
}
