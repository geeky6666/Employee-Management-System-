import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { brand } from "../../brand";

// The split-screen shell shared by the Login and Sign Up pages:
// a teal brand panel on the left (hidden on phones) and the form on the right.
// title / subtitle -> heading shown above the form
// onBack           -> goes back to the homepage
const highlights = [
  "Assign tasks and review submitted work",
  "Track salary and leave balances",
  "Manage your whole team in one place",
];

const AuthLayout = ({ title, subtitle, onBack, children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] bg-bg">
      {/* ---------- Left brand panel (desktop only) ---------- */}
      <aside className="hidden lg:flex flex-col justify-between bg-accent text-white p-12 relative overflow-hidden">
        {/* decorative rings */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full border border-white/10" />

        <button onClick={onBack} className="relative flex items-center gap-2.5 w-fit">
          <div className="h-9 w-9 rounded-md bg-white text-accent font-display font-semibold text-lg flex items-center justify-center">
            N
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            {brand.name}
          </span>
        </button>

        <div className="relative">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight max-w-md">
            Run your whole team from one workspace.
          </h2>
          <ul className="mt-8 flex flex-col gap-3.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/90">
                <span className="h-5 w-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/70">
          {brand.productName} · by {brand.name}
        </p>
      </aside>

      {/* ---------- Right: the form ---------- */}
      <main className="flex flex-col px-6 py-8 sm:px-12">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-sm">
            {/* small logo for phones, where the left panel is hidden */}
            <div className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="h-8 w-8 rounded-md bg-accent text-white font-display font-semibold flex items-center justify-center">
                N
              </div>
              <span className="font-display text-lg font-semibold">{brand.name}</span>
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-muted mt-2 mb-8">{subtitle}</p>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
