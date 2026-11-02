import React from "react";
import { useCountUp } from "../../hooks/useCountUp";

// A dashboard number card with an icon. The number counts up when the
// card appears on screen.
// icon   -> a lucide icon component
// target -> the number to count up to
// format -> optional function to display the number (e.g. rupees)
// tone   -> "accent" | "blue" | "amber" | "purple" (colour of the icon)
const tones = {
  accent: "bg-accent-soft text-accent",
  blue: "bg-status-new/10 text-status-new",
  amber: "bg-status-active/10 text-status-active",
  purple: "bg-status-submitted/10 text-status-submitted",
};

const StatCard = ({ icon: Icon, label, target, format = (n) => n, hint, tone = "accent", onClick }) => {
  const [ref, value] = useCountUp(target, 900);
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={`text-left bg-surface border border-border rounded-xl p-5 transition-all ${
        onClick ? "hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md hover:shadow-ink/5 cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-muted">{label}</span>
        <span className={`h-8 w-8 rounded-lg flex items-center justify-center ${tones[tone]}`}>
          <Icon size={16} />
        </span>
      </div>
      <p ref={ref} className="font-mono text-xl sm:text-3xl font-medium tracking-tight">
        {format(value)}
      </p>
      {hint && <p className="text-xs text-muted mt-1.5">{hint}</p>}
    </Wrapper>
  );
};

export default StatCard;
