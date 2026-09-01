"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

type PrototypeVariant = {
  name: string;
  Component: ComponentType;
};

const pickerStyles = `
.proto-picker {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.82);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    0 8px 24px rgba(0, 0, 0, 0.24),
    0 2px 6px rgba(0, 0, 0, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
}

.proto-picker-highlight {
  position: absolute;
  top: 4px;
  left: 0;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  will-change: transform;
}

/* The slide is enabled only after first paint (data-ready), so load doesn't animate. */
.proto-picker[data-ready] .proto-picker-highlight {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    width 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (prefers-reduced-motion: reduce) {
  .proto-picker[data-ready] .proto-picker-highlight { transition: none; }
}

.proto-picker-item {
  position: relative; /* sits above the highlight */
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  cursor: pointer;
  transition: color 150ms ease-out;
}

.proto-picker-item:hover {
  color: rgba(255, 255, 255, 0.85);
}

.proto-picker-item:active {
  transform: scale(0.97);
}

.proto-picker-item:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 2px;
}

.proto-picker-item[data-active] {
  color: #fff;
}

.proto-picker-divider {
  width: 1px;
  height: 16px;
  margin: 0 4px;
  background: rgba(255, 255, 255, 0.12);
}

.proto-picker-replay {
  padding: 0 10px;
  font-size: 14px;
}

.proto-picker[data-position="top"] {
  bottom: auto;
  top: 24px;
}
`;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable
  );
}

/** Standard isolated prototype stage with the fixed picker behavior. */
export default function PrototypeStage({
  variants,
  initialVariant,
  label,
}: {
  variants: PrototypeVariant[];
  initialVariant: number;
  label: string;
}) {
  const [current, setCurrent] = useState(initialVariant);
  const pickerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const ActiveVariant = variants[current].Component;

  const moveHighlight = useCallback(() => {
    const highlight = pickerRef.current?.querySelector<HTMLElement>(
      ".proto-picker-highlight",
    );
    const item = itemRefs.current[current];

    if (!highlight || !item) return;
    highlight.style.width = `${item.offsetWidth}px`;
    highlight.style.transform = `translateX(${item.offsetLeft}px)`;
  }, [current]);

  const setActive = useCallback(
    (index: number) => {
      if (index < 0 || index >= variants.length) return;

      setCurrent(index);
      const url = new URL(window.location.href);
      url.searchParams.set("v", String(index + 1));
      window.history.replaceState(null, "", url);
    },
    [variants.length],
  );

  useLayoutEffect(() => {
    moveHighlight();
  }, [moveHighlight]);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        pickerRef.current?.setAttribute("data-ready", "");
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => moveHighlight();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= variants.length) {
        setActive(number - 1);
      } else if (event.key === "ArrowRight") {
        setActive((current + 1) % variants.length);
      } else if (event.key === "ArrowLeft") {
        setActive((current - 1 + variants.length) % variants.length);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, moveHighlight, setActive, variants.length]);

  return (
    <>
      <style>{pickerStyles}</style>

      <div className="min-h-screen pt-16 sm:pt-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px] tracking-[0.18em] text-white/35 uppercase sm:text-xs">
          <span>prototype / {label}</span>
          <span>keys 1–{variants.length} or ← →</span>
        </div>

        <div key={current}>
          <ActiveVariant />
        </div>
      </div>

      <nav
        ref={pickerRef}
        className="proto-picker"
        data-position="top"
        aria-label="Prototype variants"
      >
        <span className="proto-picker-highlight" aria-hidden="true"></span>
        {variants.map((variant, index) => {
          const isActive = index === current;

          return (
            <button
              key={variant.name}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              type="button"
              className="proto-picker-item"
              data-active={isActive ? "" : undefined}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              {variant.name}
            </button>
          );
        })}
      </nav>
    </>
  );
}
