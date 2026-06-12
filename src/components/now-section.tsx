export default function NowSection() {
  const currentFocus = [
    {
      category: "building",
      items: [
        "Working on freelance projects",
        "A story/coop based Discord gaming bot",
        // "Developing v2 of PDX – aiming to make it an all-in-one AI-powered study app, including gamified group study sessions",
      ],
    },
    {
      category: "learning",
      items: [
        "App development",
        "RAG and chunking techniques, exploring their different forms",
        "New techniques for building AI agents",
        "Learning new animations daily – passionate about microanimations and often pick up ideas from different sites and tutorials",
      ],
    },
    {
      category: "exploring",
      items: [
        "Performance optimization techniques",
      ],
    },
  ];

  return (
    <section className="pb-20 text-start">
      <p className="font-display pb-2 text-base md:text-lg">(101)</p>

      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
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
