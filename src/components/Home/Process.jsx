import React from "react";
import { processSteps } from "../../brand";
import Reveal from "./Reveal";

// "How we work": 4 numbered steps.
const Process = () => {
  return (
    <section id="process" className="scroll-mt-20 border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-bold text-accent mb-3">
            How we work
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
            From first call to launch, in four steps.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <div className="border-t-2 border-ink pt-5">
                <span className="font-mono text-sm text-accent">
                  0{index + 1}
                </span>
                <h3 className="font-extrabold text-xl mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
