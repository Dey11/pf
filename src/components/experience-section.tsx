export default function ExperienceSection() {
  const experiences = [
    {
      role: "fullstack web developer - freelance",
      period: "2024",
      bullets: [
        "developed a full-featured streaming platform, handling all aspects of the web application from backend to frontend, with a focus on seamless user experience and robust content delivery.",
        "implemented secure authentication, scalable infrastructure, and custom video player integrations.",
        "impact: delivered a performant, end-to-end solution for high-traffic media consumption.",
      ],
    },
    {
      role: "frontend web developer - freelance",
      period: "2024",
      bullets: [
        "designed and built interactive crate-opening animations and ui for a gaming rewards platform, inspired by popular digital marketplaces.",
        "leveraged react and advanced css/js animation techniques to create engaging, responsive user flows.",
        "impact: enhanced user engagement and retention through visually compelling frontend experiences.",
      ],
    },
    {
      role: "fullstack web developer - freelance",
      period: "2025",
      bullets: [
        "developed and launched ballarat sports, a comprehensive booking and management platform for an australian indoor sports facility.",
        "built landing pages, integrated crm and stripe for seamless customer bookings and payments, and architected scalable backend services.",
        "impact: enabled automated scheduling and payments, improving operational efficiency and customer satisfaction.",
      ],
    },
    {
      role: "fullstack web developer - freelance",
      period: "present",
      bullets: [
        "building a trade journal application for stock traders, providing tools for strategy tracking, analytics, and note-taking.",
        "designed and implemented a rich text editor, data visualization dashboards, and secure user authentication.",
        "impact: empowered traders to analyze and refine strategies, supporting better decision-making and learning.",
      ],
    },
    {
      role: "fullstack web developer",
      period: "2025",
      bullets: [
        "contributed to frontend react components, focusing on onboarding flows, bulk password reset features, and rbac role management.",
        "collaborated on ui/ux improvements and platform stability initiatives, addressing bugs and enhancing user experience.",
        "impact: supported platform reliability and usability through targeted feature enhancements and maintenance.",
      ],
    },
    {
      role: "fullstack web developer - freelance",
      period: "present",
      bullets: [
        "building an ai-powered collaborative whiteboard application for a stealth startup, enabling real-time visual ideation and smart drawing assistance.",
        "integrated intelligent shape recognition, seamless multi-user collaboration, and dynamic canvas scaling for a smooth user experience.",
        "impact: delivered a novel platform for teams and individuals to co-create and brainstorm more effectively with the help of generative ai.",
      ],
    },
  ];

  return (
    <section className="pb-20 text-start">
      <p className="pb-2 text-sm md:text-base">(100)</p>

      <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
        experience<span className="text-secondary">.</span>
      </h1>

      <div className="space-y-8 pt-10">
        {experiences.map((exp, index) => (
          <div key={index} className="group">
            <div className="mb-4 flex flex-col gap-2">
              <h3 className="group-hover:text-secondary text-xl font-semibold transition-colors md:text-2xl">
                {exp.role}
                <span className="text-secondary">.</span>
              </h3>
              <p className="text-sm text-white/60 md:text-base">{exp.period}</p>
            </div>

            <ul className="space-y-2">
              {exp.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="flex items-start gap-3">
                  <span className="text-secondary mt-1.5 text-sm">•</span>
                  <span className="text-base leading-relaxed md:text-lg">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
