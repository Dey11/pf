import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("container mx-auto max-w-5xl px-2 py-2", className)}>
      {children}
    </div>
  );
}
