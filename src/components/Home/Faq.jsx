import React, { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../../brand";
import Reveal from "./Reveal";

// Click a question to open its answer. Only one is open at a time.
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // first one starts open

  return (
    <section id="faq" className="scroll-mt-20 border-y border-border bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-bold text-accent mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Questions, answered.</h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={open}
                >
                  <span className={`font-bold transition-colors ${open ? "text-accent" : "group-hover:text-accent"}`}>
                    {item.q}
                  </span>
                  <Plus size={18} className={`shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-45 text-accent" : ""}`} />
                </button>
                {/* the grid-rows trick animates height from 0 to "auto" smoothly */}
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-muted leading-relaxed pb-5 pr-8">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
