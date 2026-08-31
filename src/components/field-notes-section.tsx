const notes = [
  {
    number: "01",
    title: "React 19's useOptimistic Hook",
    description: "10 min read · React · from the archive",
    status: "published",
    position: "md:top-0 md:left-[2%] md:w-[72%]",
    treatment: "bg-[#F2F0E9] text-black md:-rotate-1",
  },
  {
    number: "02",
    title: "RAG without the hand-waving",
    description: "chunking, retrieval, and what survives contact with users",
    status: "working note",
    position: "md:top-[7.5rem] md:right-[1%] md:w-[70%]",
    treatment: "bg-secondary text-white md:rotate-[1.5deg]",
  },
  {
    number: "03",
    title: "Microanimations worth keeping",
    description: "small interface decisions that earn their motion",
    status: "working note",
    position: "md:top-[15.5rem] md:left-[10%] md:w-[72%]",
    treatment: "bg-[#C8C8C8] text-black md:-rotate-[0.6deg]",
  },
] as const;

/** Loose note slips: one archived article and two documented working topics. */
export default function FieldNotesSection() {
  return (
    <section className="pb-40 text-start">
      <p className="font-display pb-2 text-end text-lg md:text-xl">(101)</p>

      <h1 className="text-end text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        field notes<span className="text-secondary">.</span>
      </h1>

      <div className="relative mt-10 flex flex-col gap-3 md:block md:h-[25rem]">
        {notes.map((note) => (
          <article
            key={note.number}
            className={`group/note md:absolute ${note.position}`}
          >
            <div
              className={`grid min-h-32 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-5 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/note:scale-[1.01] group-hover/note:rotate-0 motion-reduce:rotate-0 motion-reduce:transition-none sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-5 sm:px-7 ${note.treatment}`}
            >
              <span className="font-display text-3xl leading-none font-medium tabular-nums sm:text-5xl">
                {note.number}
              </span>

              <div className="min-w-0">
                <h2 className="font-display text-xl leading-none font-semibold text-balance sm:text-3xl">
                  {note.title}
                </h2>
                <p className="mt-2 truncate text-[10px] leading-tight opacity-60 sm:text-xs">
                  {note.description}
                </p>
              </div>

              <span className="text-[9px] font-medium tracking-[0.14em] uppercase [writing-mode:vertical-rl] sm:text-[10px]">
                {note.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
