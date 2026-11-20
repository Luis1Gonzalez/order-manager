import { STATUS, cn } from "@/lib/utils";

export function StatusBadge({ status, className }) {
  const s = STATUS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        s?.className,
        className,
      )}
    >
      {s?.label ?? status}
    </span>
  );
}
