type PosterArtProps = {
  title: string;
  className?: string;
};

function StrangerThingsPoster({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="900" fill="#120305" />
      <circle cx="300" cy="318" r="204" fill="#3d070b" />
      <circle cx="300" cy="318" r="151" fill="#100204" />
      <path d="M0 612H600V900H0Z" fill="#050505" />
      {Array.from({ length: 10 }, (_, index) => (
        <path
          key={index}
          d={`M0 ${600 + index * 18}H600`}
          stroke="#ff0004"
          strokeOpacity={0.1 + index * 0.02}
          strokeWidth="2"
        />
      ))}
      <path d="M90 520L300 390L510 520" fill="none" stroke="#ff0004" />
      <text x="52" y="88" fill="#ff0004" fontSize="18" letterSpacing="7">
        HAWKINS / 01
      </text>
      <text
        x="300"
        y="790"
        fill="none"
        stroke="#ff0004"
        strokeWidth="2"
        fontSize="210"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="var(--font-darker-grotesque)"
      >
        ST
      </text>
    </svg>
  );
}

function BetterCallSaulPoster({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="900" fill="#d9b88f" />
      <circle cx="426" cy="220" r="112" fill="#ff3b31" />
      <path d="M0 610L600 390V900H0Z" fill="#d86a73" />
      <path
        d="M170 220C260 165 395 195 440 280L382 319C350 268 276 250 220 282L170 220Z"
        fill="#13100e"
      />
      <path d="M155 204L116 255L196 346L239 304Z" fill="#13100e" />
      <path d="M443 269L487 310L416 411L371 367Z" fill="#13100e" />
      <text x="45" y="78" fill="#17110d" fontSize="18" letterSpacing="7">
        ALBUQUERQUE / 02
      </text>
      <text
        x="50"
        y="815"
        fill="#17110d"
        fontSize="170"
        fontWeight="700"
        fontFamily="var(--font-darker-grotesque)"
      >
        BCS
      </text>
    </svg>
  );
}

function BreakingBadPoster({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="900" fill="#061d16" />
      <circle cx="175" cy="290" r="186" fill="#0d3c2d" />
      <circle cx="430" cy="505" r="230" fill="#09291f" />
      {Array.from({ length: 7 }, (_, index) => (
        <path
          key={index}
          d={`M0 ${150 + index * 102}H600`}
          stroke="#88a792"
          strokeOpacity="0.12"
        />
      ))}
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M${74 + index * 112} 0V900`}
          stroke="#88a792"
          strokeOpacity="0.1"
        />
      ))}
      <rect x="75" y="515" width="205" height="205" fill="#79a66b" />
      <rect x="320" y="515" width="205" height="205" fill="#b5c587" />
      <text x="46" y="82" fill="#a8c59f" fontSize="18" letterSpacing="7">
        NEW MEXICO / 03
      </text>
      <text
        x="177"
        y="674"
        fill="#061d16"
        fontSize="138"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="var(--font-darker-grotesque)"
      >
        Br
      </text>
      <text
        x="422"
        y="674"
        fill="#061d16"
        fontSize="138"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="var(--font-darker-grotesque)"
      >
        Ba
      </text>
    </svg>
  );
}

function OfficePoster({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="900" fill="#e7e7e4" />
      {Array.from({ length: 16 }, (_, index) => (
        <path
          key={index}
          d={`M0 ${80 + index * 48}H600`}
          stroke="#191919"
          strokeOpacity={index % 2 === 0 ? "0.2" : "0.08"}
        />
      ))}
      <rect x="64" y="178" width="472" height="348" fill="#f5f5f1" />
      <rect x="64" y="526" width="472" height="8" fill="#1b5e89" />
      <circle cx="300" cy="352" r="112" fill="#1b5e89" />
      <circle cx="300" cy="352" r="74" fill="#f5f5f1" />
      <text x="44" y="67" fill="#1a1a1a" fontSize="18" letterSpacing="7">
        SCRANTON / 04
      </text>
      <text
        x="300"
        y="760"
        fill="#1a1a1a"
        fontSize="132"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="var(--font-darker-grotesque)"
      >
        OFFICE
      </text>
    </svg>
  );
}

/** Original abstract poster study for each title in the prototype set. */
export default function PosterArt({ title, className }: PosterArtProps) {
  if (title === "Stranger Things") {
    return <StrangerThingsPoster className={className} />;
  }
  if (title === "Better Call Saul") {
    return <BetterCallSaulPoster className={className} />;
  }
  if (title === "Breaking Bad") {
    return <BreakingBadPoster className={className} />;
  }

  return <OfficePoster className={className} />;
}
