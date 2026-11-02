import React from "react";
import { publicNumbers } from "../../brand";
import Reveal from "./Reveal";

// Simple promises about how we work. Edit them in brand.js.
// No live data is used here, so nothing private can show up.
const NumbersBand = () => (
  <section className="mx-auto max-w-6xl px-5 pb-20 -mt-4">
    <Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {publicNumbers.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">{item.value}</p>
            <p className="text-sm text-muted mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

export default NumbersBand;
