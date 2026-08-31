"use client";

import {
  cloneElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import GithubContributionsSkeleton from "./github-contributions-skeleton";
import "react-tooltip/dist/react-tooltip.css";

// brand red (#ff0004) and darker variants. level 0 is a muted grey so empty
// days still read against the near-black background; it then ramps to the brand.
const redScale = ["#1c1c1f", "#5c0002", "#990002", "#d10003", "#ff0004"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function GithubContributions() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const calendar = calendarRef.current;
    if (!calendar) return;

    // The package exposes no completion callback. Its count appears only after
    // real data arrives; a non-calendar child is the package's error message.
    const markReadyWhenRendered = () => {
      const renderedContent = calendar.firstElementChild;
      if (!renderedContent) return false;

      const contributionCount = renderedContent.querySelector(
        ".react-activity-calendar__count",
      );
      const errorMessage = !renderedContent.matches(".react-activity-calendar");

      if (!contributionCount && !errorMessage) return false;
      setIsReady(true);
      return true;
    };

    if (markReadyWhenRendered()) return;

    const observer = new MutationObserver(() => {
      if (!markReadyWhenRendered()) return;
      observer.disconnect();
    });

    observer.observe(calendar, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        aria-label="GitHub contributions"
        aria-busy={!isReady}
        className="relative min-h-[150px] w-full"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <GithubContributionsSkeleton hidden={isReady} />
        </div>

        <div
          ref={calendarRef}
          className={`transition-opacity duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <GitHubCalendar
            username="dey11"
            year="last"
            colorScheme="dark"
            theme={{ dark: redScale }}
            fontSize={13}
            blockSize={12}
            blockMargin={4}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
            renderBlock={(block, activity) =>
              cloneElement(block as ReactElement<Record<string, unknown>>, {
                "data-tooltip-id": "gh-contrib-tooltip",
                "data-tooltip-html": `<strong>${activity.count} contribution${
                  activity.count === 1 ? "" : "s"
                }</strong> on ${formatDate(activity.date)}`,
              })
            }
          />
        </div>
      </div>

      <Tooltip id="gh-contrib-tooltip" />
    </>
  );
}
