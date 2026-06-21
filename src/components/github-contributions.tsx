"use client";

import { cloneElement, type ReactElement } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
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
  return (
    <div className="w-full" style={{ color: "rgba(255,255,255,0.6)" }}>
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
      <Tooltip id="gh-contrib-tooltip" />
    </div>
  );
}
